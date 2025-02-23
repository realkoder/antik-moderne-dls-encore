import { WebhookEvent } from "@clerk/backend";
import { api } from "encore.dev/api";
import { Webhook } from "svix";

const SIGNING_SECRET = "whsec_SpURwsANqpE2L27l66TMijkwOJt6BEaH";


export const webhookHandler = api.raw(
    { expose: true, path: "/users/webhook" },
    async (req, resp) => {
        console.log("WTF WE ARE ACTUALLY CALLED!!!");

        if (!SIGNING_SECRET) {
            throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
        }

        // Create new Svix instance with secret
        const wh = new Webhook(SIGNING_SECRET);
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
            console.log("HEY WE HERE NOW!");
            console.log("LOOK", event.data);
        } else if (eventType == "user.updated") {
            
        } else if (eventType == "user.deleted") {

        }

        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify({ message: 'Webhook received' }));
    });