"use client";

import { NotificationsProvider } from "@/lib/notificationcontext";
import { ReactNode } from "react";

export default function ConsumerLayout({ children }: { children: ReactNode }) {
  return <NotificationsProvider>{children}</NotificationsProvider>;
}
