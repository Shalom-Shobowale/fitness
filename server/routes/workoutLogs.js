import express from "express";
import WorkoutLog from "../modals/WorkoutLog.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST: Log a completed workout
router.post("/", protect, async (req, res) => {
  try {
    const { workoutId, notes } = req.body;

    const newLog = new WorkoutLog({
      user: req.user.id,
      workout: workoutId,
      notes,
    });

    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    console.error("Error logging workout:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: User's workout logs
router.get("/", protect, async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user.id })
      .populate("workout", "title description")
      .sort({ completedAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
});

export default router;
