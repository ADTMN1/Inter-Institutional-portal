require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logMiddleware = require("./middlewares/log");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const consumerRoutes = require("./routes/consumer");
const providerRoutes = require("./routes/provider");
const institutionRoutes = require("./routes/institution");
const requestRoutes = require("./routes/request");
const notificationsRoutes = require("./routes/notifications");

const activityRoutes = require("./routes/activity");
const universalRoutes = require("./routes/universalRoutes");

const universalSetupRouter = require("./routes/universalSetup");

const app = express();
app.use(logMiddleware);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://inter-institutional-portal-iqqh.vercel.app",
      "https://inter-institutional-portal.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Backend API");
});
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/consumer", consumerRoutes);
app.use("/provider", providerRoutes);
app.use("/api/", institutionRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/activity", activityRoutes);

app.use("/api/setup", universalSetupRouter);
app.use("/api/notifications", notificationsRoutes);

app.use("/uploads", express.static("uploads")); // serve uploaded files
app.use("/api/submit", universalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
