import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['Registered', 'Attended', 'Completed', 'Cancelled'],
    default: 'Registered'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);
export default EventRegistration;