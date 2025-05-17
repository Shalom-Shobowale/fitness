import mongoose from "mongoose";

const workoutLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    workout: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan", required: true },
    notes: { type: String },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const WorkoutLog = mongoose.model("WorkoutLog", workoutLogSchema);
export default WorkoutLog;
