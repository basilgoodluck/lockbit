import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

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
        <AuthProvider>
          <Header />
          <main className="flex-grow max-w-full">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
