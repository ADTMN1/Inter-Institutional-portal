"use client";

import { useState } from "react";
import { useNotifications } from "@/lib/notificationcontext";
import NotificationCard from "@/components/notifications/NotificationCard";
import NotificationModal from "@/components/notifications/NotificationModal";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { notifications } = useNotifications();
  const [selectedNotification, setSelectedNotification] = useState<
    number | null
  >(null);
  const activeNotification = notifications.find(
    (n) => n.id === selectedNotification
  );

  return (
    <>
      {/* Option 1: Interactive cards + modal */}
      <div className="p-6 space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No notifications</p>
        ) : (
          notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onView={() => setSelectedNotification(n.id)}
            />
          ))
        )}

        {activeNotification && (
          <NotificationModal
            notification={activeNotification}
            onClose={() => setSelectedNotification(null)}
          />
        )}
      </div>

      {/* Option 2: Simple list (uncomment if you prefer list view) */}
      {/* <NotificationsList notifications={notifications} /> */}

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">{children}</div>
      </div>
    </>
  );
}
