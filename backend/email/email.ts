import { APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { Subscription } from "encore.dev/pubsub";
import { Resend } from 'resend';
import { UserAddedTopic, UserRequest } from "../users/api/users/messaging/userAddedTopic";

const resendApiKey = secret("ResendApiKey");
const resend = new Resend(resendApiKey());

const sendEmail = async ({ name, email }: UserRequest) => {
  const msg = {
    from: 'welcome@realkoder.com',
    to: email,
    subject: 'Welcome to Antik Moderne',
    html: `
      <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #333;">
        <h2>Welcome to Antik Moderne, ${name}!</h2>
        <p>We're thrilled to have you join our community of art and poster enthusiasts. At Antik Moderne, we believe in the power of art to transform spaces and inspire lives.</p>
        <p>As a welcome gift, here's a <strong>10% discount</strong> on your first purchase! Just use the code <strong>WELCOME10</strong> at checkout.</p>
        <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@realkoder.com" style="color: #1a82e2;">support@realkoder.com</a>.</p>
        <p>Thank you for choosing Antik Moderne. Let's make your space beautiful together!</p>
        <p>Warm regards,<br>The Antik Moderne Team</p>
      </div>
    `
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