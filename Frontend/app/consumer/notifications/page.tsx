"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NotificationCard from "@/components/notifications/NotificationCard";
import NotificationModal from "@/components/notifications/NotificationModal";
import { useNotifications } from "@/lib/notificationcontext";

export default function NotificationsPage() {
  const { notifications } = useNotifications();
  const [viewingNotification, setViewingNotification] = useState<any>(null);

  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  return (
    <DashboardLayout userRole="consumer">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-gray-600 mt-2">
              Stay updated on your requests and provider responses
            </p>
          </div>
          <Badge variant="secondary">{unreadNotifications.length} unread</Badge>
        </div>

        <Tabs defaultValue="unread" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="unread">
              Unread ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="read">
              Read ({readNotifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="unread">
            {unreadNotifications.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onView={setViewingNotification}
              />
            ))}
            {unreadNotifications.length === 0 && (
              <p className="text-center text-gray-600">
                No unread notifications
              </p>
            )}
          </TabsContent>

          <TabsContent value="all">
            {notifications.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onView={setViewingNotification}
              />
            ))}
            {notifications.length === 0 && (
              <p className="text-center text-gray-600">No notifications</p>
            )}
          </TabsContent>

          <TabsContent value="read">
            {readNotifications.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onView={setViewingNotification}
              />
            ))}
            {readNotifications.length === 0 && (
              <p className="text-center text-gray-600">No read notifications</p>
            )}
          </TabsContent>
        </Tabs>

        {viewingNotification && (
          <NotificationModal
            notification={viewingNotification}
            onClose={() => setViewingNotification(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
