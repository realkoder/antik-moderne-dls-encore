import { APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { Subscription } from "encore.dev/pubsub";
import { Resend } from 'resend';
import { UserAddedTopic, UserRequest } from "../users/api/users/messaging/userAddedTopic";

const resendApiKey = secret("ResendApiKey");
const resend = new Resend(resendApiKey());

const sendEmail = async ({ name, email }: UserRequest) => {
  console.log("WOW CALLED", name, email);
  const msg = {
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Welcome to Antik Moderne',
    html: `<p>We wish you welcome for Antik Moderne, thank you for signing up <strong>${name}</strong>!</p>`
  };

  try {
    await resend.emails.send(msg);
  } catch (error) {
    console.error(error);
    throw APIError.internal("Failed to send email with Resend");
  }
}
new Subscription(UserAddedTopic, "welcome-email", {
  handler: async (event) => {
    await sendEmail(event);
  },
});