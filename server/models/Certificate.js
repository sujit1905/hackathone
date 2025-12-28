import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  certificateId: {
    type: String,
    unique: true
  },
  issuedDate: {
    type: Date,
    default: Date.now
  }
});

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;