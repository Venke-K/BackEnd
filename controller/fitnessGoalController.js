import FitnessGoal from "../models/FitnessGoal.js";
import mongoose from "mongoose";

// Create a new fitness goal
export const createFitnessGoal = async (req, res) => {
  try {
    const { goal, targetDate, status } = req.body;
    const newGoal = new FitnessGoal({
      userId: req.user.id, // Use the authenticated user's ID
      goal,
      targetDate,
      status,
    });
    await newGoal.save();

    res.status(201).json({ newGoal });
  } catch (error) {
    console.error("Error creating fitness goal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get fitness goals for the logged-in user
export const getFitnessGoals = async (req, res) => {
  try {
    const goals = await FitnessGoal.find({ userId: req.user.id });
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching fitness goals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateFitnessGoal = async (req, res) => {
  try {
    const { id } = req.params; // Get goal ID from request parameters
    const { goal, targetDate, status } = req.body; // Get updated data from request body

    // Find the fitness goal by ID and update it
    const updatedGoal = await FitnessGoal.findByIdAndUpdate(
      id,
      { goal, targetDate, status },
      { new: true, runValidators: true } // Return the updated document
    );

    // If the goal is not found, send a 404 error
    if (!updatedGoal) {
      return res.status(404).json({ message: "Fitness goal not found" });
    }

    // Send the updated goal as a response
    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error("Error updating fitness goal:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const result = await FitnessGoal.findByIdAndDelete(goalId);
    if (!result) {
      return res.status(404).json({ message: "Fitness goal not found" });
    }
    res.status(200).json({ message: "Fitness goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting fitness goal", error });
  }
};

export const getFitnessInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    const insights = await FitnessGoal.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }, // Match the logged-in user
      },
      {
        $group: {
          _id: null, // Grouping all records into one
          totalGoals: { $sum: 1 }, // Total number of goals
          achievedGoals: {
            $sum: { $cond: [{ $eq: ["$status", "Achieved"] }, 1, 0] },
          }, // Count achieved goals
          // Add other metrics as needed
        },
      },
    ]);

    res.status(200).json(insights[0] || {}); // Return the first result or an empty object
  } catch (error) {
    console.error("Error fetching fitness insights:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
