import mongoose from "mongoose";

// Define the NutritionLog schema
const NutritionLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  meal: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the NutritionLog model
const NutritionLog = mongoose.model("NutritionLog", NutritionLogSchema);

export default NutritionLog;
