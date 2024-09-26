import express from "express";
import {
  createFitnessGoal,
  getFitnessGoals,
  updateFitnessGoal,
  deleteGoal,
  getFitnessInsights,
} from "../controller/fitnessGoalController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Fitness Goals
router.post("/fitness-goals", authMiddleware, createFitnessGoal);
router.get("/fitness-goals", authMiddleware, getFitnessGoals);
router.put("/fitness-goals/:id", updateFitnessGoal);
router.delete("/fitness-goals/:id", deleteGoal);
router.get("/fitness-goals/insights", authMiddleware, getFitnessInsights);

export default router;
