import express from "express";
import {
  addNutrition,
  getNutritionLog,
  updateNutrition,
  deleteNutritionLog,
  getNutritioninsightsLog

} from "../controller/nutritionTrackingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/nutrition", authMiddleware, addNutrition);
router.get("/nutrition", authMiddleware, getNutritionLog);
router.put("/nutrition/:id",  updateNutrition);
router.delete("/nutrition/:id",  deleteNutritionLog);
router.get("/nutrition/insights",authMiddleware, getNutritioninsightsLog);

export default router;
