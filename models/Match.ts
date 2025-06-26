import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  ground: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Match || mongoose.model('Match', MatchSchema);