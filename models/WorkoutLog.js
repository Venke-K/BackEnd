import mongoose from 'mongoose';
// import { string } from 'yup';

const workoutLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Exercise: {
    type: String,
    required: true,
  },
  Duration: {
    type: Number,
    required: true,
  },
  Intensity: { 
    type: Number,
    required: true,
  },
  Calories: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema);

export default WorkoutLog;
