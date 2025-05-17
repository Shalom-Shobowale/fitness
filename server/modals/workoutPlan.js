// server/modals/WorkoutPlan.js
import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or 'Admin'
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

export default WorkoutPlan;
