import NutritionLog from "../models/Nutrition.js";
import mongoose from "mongoose";

export const addNutrition = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const nutritionLog = new NutritionLog({
      user: req.user.id,
      mealType: req.body.mealType,
      meal: req.body.meal,
      quantity: req.body.quantity,
      calories: req.body.calories,
    });

    const savedLog = await nutritionLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    console.warn("Error saving nutrition log:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getNutritionLog = async (req, res) => {
  try {
    // const userId = req.user.id;
    const nutritionLogs = await NutritionLog.find({ user: req.user.id });
    res.status(200).json(nutritionLogs);
  } catch (error) {
    console.log("Error fetching nutrition logs:", error);
    res.status(500)({ message: "Failed to fetch nutrition logs" });
  }
};

export const updateNutrition = async (req, res) => {
  try {
    const { id } = req.params;
    const { mealType, meal, quantity, calories } = req.body;

    const updateNutritionLog = await NutritionLog.findByIdAndUpdate(
      id,
      {
        mealType,
        meal,
        quantity,
        calories,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateNutritionLog) {
      return res.status(400).json({ message: "Nutrition Log not found" });
    }
    res.status(200).json(updateNutritionLog);
  } catch (error) {
    console.error("Error updating Nutrition goal:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNutritionLog = async (req, res) => {
  try {
    const nutiId = req.params.id;
    const result = await NutritionLog.findByIdAndDelete(nutiId);
    if (!result) {
      return res.status(404).json({ message: " Nutilog not found" });
    }
    res.status(200).json({ message: "Nutilog deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting fitness goal", error });
  }
};

export const getNutritioninsightsLog = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Logged-in User ID:", userId);

    const insights = await NutritionLog.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) }, // Match the logged-in user
      },
      {
        $group: {
          _id: null,
          totalLogs: { $sum: 1 }, // Total number of logs
          totalCalories: { $sum: "$calories" }, // Sum calories (case-sensitive)
          averageCalories: { $avg: "$calories" }, // Average calories per log
        },
      },
    ]);

    console.log("Insights:", insights); // Log insights for debugging

    if (insights.length === 0) {
      return res.status(200).json({ message: "No logs found" });
    }

    res.status(200).json(insights[0] || {});
  } catch (error) {
    console.error("Error fetching nutrition insights:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
