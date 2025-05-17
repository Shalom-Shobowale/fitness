import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Booking from "./modals/Booking.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "./modals/Admin.js";
import { sendBookingEmail } from "./utils/sendEmail.js";
import { protect } from "./middleware/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import workoutLogsRoutes from "./routes/workoutLogs.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://fitness-3wke.onrender.com"];

// ✅ UPDATED CORS CONFIG
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    exposedHeaders: ["Authorization"], // ✅ ADD THIS LINE
  })
);

// JSON Body Parser
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// 📥 POST - Save a booking and send email
app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    await sendBookingEmail(req.body);
    res.status(200).json({ message: "Booking saved & email sent!" });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "Failed to save booking" });
  }
});
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/workout-logs", workoutLogsRoutes);

app.post("/api/workouts", async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    console.error("Error creating workout:", err);
    res.status(500).json({ message: "Failed to create workout" });
  }
});

// ✅ GET - Fetch all bookings (protected)
app.get("/api/bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Failed to fetch bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🗑 DELETE - Delete a booking (protected)
app.delete("/api/bookings/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    console.error("❌ Failed to delete booking:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔐 POST - Admin login with JWT
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 👤 POST - Register a new admin
app.post("/api/admin/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await Admin.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin created!" });
  } catch (err) {
    console.error("Error registering admin:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
