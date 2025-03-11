// Get from Clerk Dashboard → <YOUR APP> → Domains
// Should be in the format "https://<yourapp>.clerk.accounts.dev"
export const DOMAIN = "https://modern-alpaca-49.clerk.accounts.dev";

// Add the domains that you want to allow to access your API
export const AUTHORIZED_PARTIES = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://antik-moderne-dls-encore.vercel.app"
];