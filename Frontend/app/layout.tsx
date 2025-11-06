import type { Metadata } from "next";
import "./globals.css";
import { NotificationsProvider } from "@/lib/notificationcontext"; // ✅ make sure this path exists

export const metadata: Metadata = {
  title: "Data Exchange Portal",
  description: "A modern data sharing dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/*  Wrap everything in the NotificationsProvider */}
        <NotificationsProvider>{children}</NotificationsProvider>
      </body>
    </html>
  );
}
