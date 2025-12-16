import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AuthProvider from "./providers/auth";
import ReduxProvider from "./providers/redux";
// import 

export const metadata: Metadata = {
  title: "Data Encryption App",
  description: "Securely encrypt your files and text with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900 overflow-x-hidden">
        <ReduxProvider>
          <AuthProvider>
              {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
