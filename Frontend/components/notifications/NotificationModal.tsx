"use client";

import { Notification, useNotifications } from "@/lib/notificationcontext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface NotificationModalProps {
  notification: Notification;
  onClose: () => void;
}

export default function NotificationModal({
  notification,
  onClose,
}: NotificationModalProps) {
  const { markAsRead, markAsUnread } = useNotifications();
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Notification</h3>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className="text-gray-700">{notification.message}</p>
        <div className="flex gap-3 pt-4">
          {notification.read ? (
            <Button
              onClick={() => {
                markAsUnread(notification.id);
                onClose();
              }}
              variant="outline"
            >
              Mark as Unread
            </Button>
          ) : (
            <Button
              onClick={() => {
                markAsRead(notification.id);
                onClose();
              }}
              variant="outline"
            >
              Mark as Read
            </Button>
          )}
          <Button
            onClick={() => {
              onClose();
              router.push(`/consumer/requests/${notification.requestId}`);
            }}
          >
            Go to Request
          </Button>
        </div>
      </div>
    </div>
  );
}
