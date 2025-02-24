import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { Subscription } from "encore.dev/pubsub";
import { Resend } from 'resend';
import { UserAddedTopic } from "../users/api/users/messaging/userAddedTopic";

const resendApiKey = secret("ResendApiKey");
const resend = new Resend(resendApiKey());

export const send = api(
  { expose: false, method: "POST" },
  async ({ name, email }: {
    name: string;
    email: string;
  }): Promise<void> => {
    console.log("WOW CALLED", name, email);
    const msg = {
      from: 'onboarding@resend.dev',
      to: 'alexanderbtcc@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    };

    try {
      await resend.emails.send(msg);
    } catch (error) {
      throw APIError.internal("Failed to send email");
    }
  },
);

const _ = new Subscription(UserAddedTopic, "welcome-email", {
  handler: async (event) => {
    await send(event);
  },
});