import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createWorkoutLog,
  getWorkoutLogs,
  updateWorkOut,
  deleteWorkOut,
  getWorkoutInsights,
} from "../controller/workoutLogController.js";

const router = express.Router();

router.post("/workouts", authMiddleware, createWorkoutLog);
router.get("/workouts", authMiddleware, getWorkoutLogs);
router.put("/workouts/:id",  updateWorkOut);
router.delete("/workouts/:id",  deleteWorkOut);
router.get("/workouts/insights", authMiddleware, getWorkoutInsights);

export default router;
