import { WebhookEvent } from "@clerk/backend";
import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { Webhook } from "svix";
import UserService from "../services/user.service";
import { UserAddedTopic } from "../messaging/userAddedTopic";

const WebhookSigningSecretKey = secret("WebhookSigningSecretKey");

export const webhookHandler = api.raw(
    { expose: true, path: "/api/users/webhook" },
    async (req, resp) => {
        const signingSecret = WebhookSigningSecretKey();

        if (!signingSecret) {
            throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
        }

        // Create new Svix instance with secret
        const wh = new Webhook(signingSecret);
        // Extract headers from the request
        const headers = req.headers;
        const svix_id = headers['svix-id'];
        const svix_timestamp = headers['svix-timestamp'];
        const svix_signature = headers['svix-signature'];

        // Check if any of the required headers are missing
        if (!svix_id || !svix_timestamp || !svix_signature) {
            throw new Error('Error: Missing Svix headers');
        }
        if (!svix_id || !svix_timestamp || !svix_signature) {
            resp.writeHead(400, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ error: 'Error: Missing Svix headers' }));
            return;
        }

        // Get body
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        await new Promise(resolve => req.on('end', resolve));

        let event: WebhookEvent;

        // Verify payload with headers
        try {
            event = wh.verify(body, {
                'svix-id': Array.isArray(svix_id) ? svix_id[0] : svix_id,
                'svix-timestamp': Array.isArray(svix_timestamp) ? svix_timestamp[0] : svix_timestamp,
                'svix-signature': Array.isArray(svix_signature) ? svix_signature[0] : svix_signature,
            }) as WebhookEvent;
        } catch (err) {
            console.error('Error: Could not verify webhook:', err);
            resp.writeHead(400, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ error: 'Error: Verification error' }));
            return;
        }

        const eventType = event.type;
        if (eventType === "user.created") {
            try {
                const email = event.data.email_addresses[0].email_address;
                await UserService.create(event.data);
                if (email) {
                    await UserAddedTopic.publish({ name: event.data.first_name ?? "MissingName", email });
                }
            } catch (e) {
                console.error("Error with creating user by webhook", e);
            }
        } else if (eventType == "user.updated") {
            await UserService.update(event.data.id, event.data);
        } else if (eventType == "user.deleted") {
            const userId = event.data.id;
            if (userId) {
                try {
                    await UserService.delete(event.data.id ?? "");
                } catch (e) {
                    console.error("Error with deleting user by webhook", e)
                }
            }
        }

        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify({ message: 'Webhook received' }));
    });