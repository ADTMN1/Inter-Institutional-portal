"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface Notification {
  id: number;
  requestId: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: number) => void;
  markAsUnread: (id: number) => void;
  fetchNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "${process.env.NEXT_PUBLIC_API_URL}/api/notifications/my-notifications",
        {
          withCredentials: true,
        }
      );
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/read`,
        {},
        { withCredentials: true }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAsUnread = async (id: number) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/unread`,
        {},
        { withCredentials: true }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: false } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsRead, markAsUnread, fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used inside NotificationsProvider"
    );
  return context;
};
