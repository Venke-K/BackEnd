import mongoose from 'mongoose';

const fitnessInsightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  insights: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const FitnessInsight = mongoose.model('FitnessInsight', fitnessInsightSchema);

export default FitnessInsight;

