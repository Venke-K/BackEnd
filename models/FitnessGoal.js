import mongoose from "mongoose";

const fitnessGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },

    targetDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      // New status field
      type: String,
      enum: ["Pending", "Achieved"],
      default: "Pending", // Default to pending when created
    },
  },
  { timestamps: true }
);

const FitnessGoal = mongoose.model("FitnessGoal", fitnessGoalSchema);

export default FitnessGoal;
