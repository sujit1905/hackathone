import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  time: String,
  location: String,
  mode: { type: String, default: 'online' },
  feeType: { type: String, default: 'free' },
  fee: Number,
  registrationStatus: { type: String, default: 'open' },
  regOpens: Date,
  regCloses: Date,
  org: { type: String, default: 'CLG EventHub' },
  participants: { type: String, default: 'Unlimited' },
  image: { type: String, default: '/images/events01.png' },
  reach: { type: Number, default: 0 },
  visibility: { 
    type: String, 
    enum: ['public', 'private'],
    default: 'public' 
  },
  isFeatured: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

// Ensure existing events get default visibility
eventSchema.pre('save', function(next) {
  if (!this.visibility) {
    this.visibility = 'public';
  }
  next();
});

// Create and export the model
const Event = mongoose.model('Event', eventSchema);
export default Event;