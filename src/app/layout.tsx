import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // Correct path: one level up
import { StackProvider } from "@stackframe/stack";
import { stackClientApp } from "@/stack";
import Header from "../components/Header/Header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WilsonRIP's Education Hub",
  description: "Learn math and grammar!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StackProvider app={stackClientApp}>
            <Header />
            {children}
          </StackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
