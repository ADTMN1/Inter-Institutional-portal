"use client";

import { Notification, useNotifications } from "@/lib/notificationcontext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface NotificationCardProps {
  notification: Notification;
  onView: (notif: Notification) => void;
}

export default function NotificationCard({
  notification,
  onView,
}: NotificationCardProps) {
  const { markAsRead } = useNotifications();
  const router = useRouter();

  return (
    <Card
      className={`border p-4 ${
        notification.read ? "bg-gray-50" : "bg-blue-50"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          <h4
            className={`${
              notification.read ? "text-gray-600" : "text-gray-800"
            } font-semibold`}
          >
            Notification
          </h4>
        </div>
        <Badge variant={notification.read ? "outline" : "destructive"}>
          New
        </Badge>
      </div>
      <p
        className={`${
          notification.read ? "text-gray-500" : "text-gray-700"
        } mt-2`}
      >
        {notification.message}
      </p>
      <div className="flex justify-end gap-2 mt-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onView(notification)}
        >
          <Eye className="h-4 w-4" /> View
        </Button>
        {!notification.read && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => markAsRead(notification.id)}
          >
            <CheckCircle className="h-4 w-4" /> Mark as Read
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            router.push(`/consumer/requests/${notification.requestId}`)
          }
        >
          Go to Request
        </Button>
      </div>
    </Card>
  );
}
