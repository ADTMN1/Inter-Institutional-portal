const express = require("express");
const notificationsController = require("../controllers/notificationsController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Get all notifications for logged-in user
router.get(
  "/my-notifications",
  authMiddleware,
  notificationsController.getMyNotifications
);

// Mark as read / unread
router.patch(
  "/:notificationId/read",
  authMiddleware,
  notificationsController.markAsRead
);
router.patch(
  "/:notificationId/unread",
  authMiddleware,
  notificationsController.markAsUnread
);

// Delete notification
router.delete(
  "/:notificationId",
  authMiddleware,
  notificationsController.deleteNotification
);

// Mark all as read
router.patch(
  "/mark-all-read",
  authMiddleware,
  notificationsController.markAllAsRead
);

module.exports = router;
