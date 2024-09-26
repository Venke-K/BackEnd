import WorkoutLog from "../models/WorkoutLog.js";
import mongoose from "mongoose";

// Create a new workout log
export const createWorkoutLog = async (req, res) => {
  try {
    const { Exercise, Duration, Intensity, Calories, Date } = req.body;
    const newLog = new WorkoutLog({
      userId: req.user.id,
      Exercise,
      Duration,
      Intensity,
      Calories,
      Date,
    });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    console.error("Error creating workout log:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get workout logs for the logged-in user
export const getWorkoutLogs = async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ userId: req.user.id });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching workout logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateWorkOut = async (req, res) => {
  try {
    const { id } = req.params; // Get goal ID from request parameters
    const { Exercise, Duration, Intensity, Calories, Date } = req.body; // Get updated data from request body

    // Find the fitness goal by ID and update it
    const updatedLog = await WorkoutLog.findByIdAndUpdate(
      id,
      { Exercise, Duration, Intensity, Calories, Date },
      { new: true, runValidators: true } // Return the updated document
    );

    // If the goal is not found, send a 404 error
    if (!updatedLog) {
      return res.status(404).json({ message: "Fitness goal not found" });
    }

    // Send the updated goal as a response
    res.status(200).json(updatedLog);
  } catch (error) {
    console.error("Error updating fitness goal:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteWorkOut = async (req, res) => {
  try {
    const logId = req.params.id;
    const result = await WorkoutLog.findByIdAndDelete(logId);
    if (!result) {
      return res.status(404).json({ message: "Fitness goal not found" });
    }
    res.status(200).json({ message: "Fitness goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting fitness goal", error });
  }
};

// Get fitness insights for the logged-in user

export const getWorkoutInsights = async (req, res) => {
  try {
    const insights = await WorkoutLog.aggregate([
      {
        $group: {
          _id: "$userId",
          totalDuration: {
            $sum: {
              $convert: {
                input: "$Duration",
                to: "int",
                onError: 0,
                onNull: 0,
              },
            },
          },
          averageIntensity: { $avg: "$Intensity" },
          totalCaloriesBurned: { $sum: "$Calories" },
          totalWorkouts: { $count: {} },
        },
      },
      {
        $match: { _id: new mongoose.Types.ObjectId(req.user.id) }, // Filter for the logged-in user
      },
      {
        $project: {
          _id: 0,
          totalDuration: 1,
          averageIntensity: { $round: ["$averageIntensity", 2] },
          totalCaloriesBurned: 1,
          totalWorkouts: 1,
        },
      },
    ]);

    res.status(200).json(insights[0] || {}); // Return insights or empty object if none
  } catch (error) {
    console.error("Error fetching workout insights:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getWorkoutInsights;
