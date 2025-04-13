import { StackClientApp } from "@stackframe/stack";

if (!process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY) {
  throw new Error(
    "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY environment variable is not set."
  );
}

// Determine token store based on environment (server vs client)
const isServer = typeof window === "undefined";
const tokenStore = isServer ? "memory" : "cookie";

export const stackClientApp = new StackClientApp({
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  tokenStore: tokenStore, // Use conditional token store
});
