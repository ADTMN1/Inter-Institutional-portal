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

  // Debug environment variable loading
  useEffect(() => {
    console.log("🔍 NotificationsProvider mounted");
    console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("Type of env var:", typeof process.env.NEXT_PUBLIC_API_URL);

    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("❌ NEXT_PUBLIC_API_URL is undefined!");
    } else if (process.env.NEXT_PUBLIC_API_URL.includes("$%7B")) {
      console.error(
        "❌ Environment variable contains malformed template literal"
      );
    }
  }, []);

  const getApiUrl = (endpoint: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    // If env var is malformed or missing, use fallback
    if (!baseUrl || baseUrl.includes("$%7B")) {
      console.warn("⚠️ Using fallback URL due to env var issue");
      return `https://inter-institutional-portal-4.onrender.com${endpoint}`;
    }

    // Ensure no double slashes
    const url = `${baseUrl.replace(/\/$/, "")}${endpoint}`;
    console.log(`🔗 Constructed URL: ${url}`);
    return url;
  };

  const fetchNotifications = async () => {
    try {
      const url = getApiUrl("/api/notifications/my-notifications");
      console.log("📡 Fetching notifications from:", url);

      const res = await axios.get(url, {
        withCredentials: true,
      });
      setNotifications(res.data);
      console.log("✅ Notifications fetched successfully:", res.data);
    } catch (err) {
      console.error("❌ Failed to fetch notifications:", err);
      console.error("Error details:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    console.log("🔄 Setting up notifications interval");
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000); // auto-refresh every 10s
    return () => {
      console.log("🧹 Cleaning up notifications interval");
      clearInterval(interval);
    };
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const url = getApiUrl(`/api/notifications/${id}/read`);
      console.log("📝 Marking notification as read:", id, "URL:", url);

      await axios.patch(url, {}, { withCredentials: true });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      console.log("✅ Notification marked as read:", id);
    } catch (err) {
      console.error("❌ Failed to mark notification as read:", err);
      console.error("Error details:", err.response?.data || err.message);
    }
  };

  const markAsUnread = async (id: number) => {
    try {
      const url = getApiUrl(`/api/notifications/${id}/unread`);
      console.log("📝 Marking notification as unread:", id, "URL:", url);

      await axios.patch(url, {}, { withCredentials: true });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: false } : n))
      );
      console.log("✅ Notification marked as unread:", id);
    } catch (err) {
      console.error("❌ Failed to mark notification as unread:", err);
      console.error("Error details:", err.response?.data || err.message);
    }
  };

  const value: NotificationContextType = {
    notifications,
    markAsRead,
    markAsUnread,
    fetchNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
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
