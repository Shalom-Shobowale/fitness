import express from "express";
import mongoose from "mongoose";
import WorkoutPlan from "../modals/workoutPlan.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/workouts (admin or user create)
router.post("/", protect, async (req, res) => {
  try {
    const creatorId = req.user ? req.user.id : req.admin.id;

    const newPlan = new WorkoutPlan({
      ...req.body,
      createdBy: creatorId,
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    console.error("Error creating workout:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/workouts (all plans)
router.get("/", async (req, res) => {
  try {
    const plans = await WorkoutPlan.find().sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (err) {
    console.error("Error fetching workouts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/workouts/:id (single plan)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid workout ID" });
  }

  try {
    const plan = await WorkoutPlan.findById(id);
    if (!plan) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json(plan);
  } catch (err) {
    console.error("Error fetching workout:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/workouts/:id/complete
router.patch("/:id/complete", async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    workout.completed = true; // Add this field to your model if it doesn't exist yet
    await workout.save();

    res.status(200).json({ message: "Workout marked as completed" });
  } catch (err) {
    console.error("Error logging workout:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a workout
router.delete("/:id", async (req, res) => {
  try {
    const workout = await WorkoutPlan.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.status(200).json({ message: "Workout deleted" });
  } catch (err) {
    console.error("Error deleting workout:", err); // optional
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
