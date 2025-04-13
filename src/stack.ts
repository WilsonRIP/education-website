import { StackServerApp, StackClientApp } from "@stackframe/stack";

if (!process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY) {
  throw new Error(
    "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY environment variable is not set."
  );
}

// Initialize and export the Client App
export const stackClientApp = new StackClientApp({
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  tokenStore: "memory",
  // apiUrl is NOT a direct config option here
});

// Initialize Server App conditionally
let stackServerApp: StackServerApp | null = null;

if (typeof window === "undefined") {
  if (!process.env.STACK_SECRET_SERVER_KEY) {
    throw new Error("STACK_SECRET_SERVER_KEY environment variable is not set.");
  }

  // Initialize and potentially export the Server App only on the server
  stackServerApp = new StackServerApp({
    tokenStore: "memory",
    publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    secretServerKey: process.env.STACK_SECRET_SERVER_KEY,
    // apiUrl is NOT a direct config option here
  });
}

// Export the potentially null server app. Consumers must handle the null case or ensure it's only used server-side.
export { stackServerApp };
