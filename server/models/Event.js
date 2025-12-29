// server/models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, default: "Online" },
  mode: { type: String, enum: ['online', 'offline'], default: 'online' },
  feeType: { type: String, enum: ['free', 'paid'], default: 'free' },
  fee: { type: Number, default: 0 },
  registrationStatus: { type: String, enum: ['open', 'closed'], default: 'open' },
  regOpens: { type: Date },
  regCloses: { type: Date },
  org: { type: String, default: "CLG EventHub" },
  participants: { type: String, default: "Unlimited" },
  image: { type: String },
  reach: { type: Number, default: 0 }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
