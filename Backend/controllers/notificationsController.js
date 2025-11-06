const db = require("../config/db");

// Get all notifications for the logged-in user
exports.getMyNotifications = (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const query = `
    SELECT * 
    FROM notifications 
    WHERE user_id = ?
    ORDER BY createdAt DESC
    LIMIT 50
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const formatted = results.map((n) => ({
      id: n.id,
      requestId: n.requestId,
      message: n.message,
      type: n.type || "info",
      timestamp: n.createdAt,
      read: !!n.isRead,
      providerId: n.institution_id,
    }));

    res.json(formatted);
  });
};

// Mark single notification as read
exports.markAsRead = (req, res) => {
  const { notificationId } = req.params;
  db.query(
    "UPDATE notifications SET isRead = TRUE WHERE id = ?",
    [notificationId],
    (err) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      res.json({ message: "Notification marked as read" });
    }
  );
};

// Mark single notification as unread
exports.markAsUnread = (req, res) => {
  const { notificationId } = req.params;
  db.query(
    "UPDATE notifications SET isRead = FALSE WHERE id = ?",
    [notificationId],
    (err) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      res.json({ message: "Notification marked as unread" });
    }
  );
};

// Delete notification
exports.deleteNotification = (req, res) => {
  const { notificationId } = req.params;
  db.query(
    "DELETE FROM notifications WHERE id = ?",
    [notificationId],
    (err) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      res.json({ message: "Notification deleted" });
    }
  );
};

// Mark all notifications as read
exports.markAllAsRead = (req, res) => {
  const userId = req.user?.id;
  db.query(
    "UPDATE notifications SET isRead = TRUE WHERE user_id = ?",
    [userId],
    (err) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      res.json({ message: "All notifications marked as read" });
    }
  );
};
