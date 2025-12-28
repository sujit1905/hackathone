import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  college: {
    type: String,
    default: 'DNICA'
  },
  degree: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  interests: [{
    type: String
  }],
  avatar: {
    type: String,
    default: ''
  },
  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
userProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate profile completion percentage
userProfileSchema.methods.calculateCompletion = function() {
  const fields = [
    this.name,
    this.gender,
    this.phone,
    this.college,
    this.degree,
    this.branch,
    this.year
  ];
  
  const filledCount = fields.filter(field => field && field.trim() !== '').length;
  return Math.round((filledCount / fields.length) * 100);
};

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
export default UserProfile;