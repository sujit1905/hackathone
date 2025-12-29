import UserProfile from '../models/UserProfile.js';
import User from '../models/User.js';
import EventRegistration from '../models/EventRegistration.js';
import Event from '../models/Event.js'; // Keep same - model now exists
import Certificate from '../models/Certificate.js';

// 🔥 GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    let profile = await UserProfile.findOne({ userId: req.user._id });
    
    // If profile doesn't exist, create a default one
    if (!profile) {
      profile = await UserProfile.create({
        userId: req.user._id,
        name: req.user.name,
        college: 'DNICA',
        bio: 'Passionate student exploring campus events and opportunities.',
        skills: ['Event Planning', 'Team Management', 'Public Speaking'],
        interests: ['Tech', 'Sports', 'Arts', 'Music']
      });
      
      // Calculate initial completion
      profile.profileCompletion = profile.calculateCompletion();
      await profile.save();
    }
    
    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching profile' 
    });
  }
};

// 🔥 UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const { 
      name, gender, phone, college, degree, 
      branch, year, bio, skills, interests 
    } = req.body;
    
    // Validate required fields
    if (!name || !college) {
      return res.status(400).json({
        success: false,
        message: 'Name and college are required'
      });
    }
    
    // Find existing profile
    let profile = await UserProfile.findOne({ userId: req.user._id });
    
    if (!profile) {
      // Create new profile
      profile = new UserProfile({
        userId: req.user._id,
        name,
        gender: gender || '',
        phone: phone || '',
        college,
        degree: degree || '',
        branch: branch || '',
        year: year || '',
        bio: bio || '',
        skills: skills || [],
        interests: interests || []
      });
    } else {
      // Update existing profile
      profile.name = name;
      profile.gender = gender || '';
      profile.phone = phone || '';
      profile.college = college;
      profile.degree = degree || '';
      profile.branch = branch || '';
      profile.year = year || '';
      profile.bio = bio || '';
      profile.skills = skills || [];
      profile.interests = interests || [];
    }
    
    // Calculate completion percentage
    profile.profileCompletion = profile.calculateCompletion();
    
    // Save profile
    await profile.save();
    
    // Also update user name if changed
    if (req.user.name !== name) {
      await User.findByIdAndUpdate(req.user._id, { name });
    }
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update profile' 
    });
  }
};

// 🔥 GET USER EVENTS
export const getUserEvents = async (req, res) => {
  try {
    const registrations = await EventRegistration.find({ userId: req.user._id })
      .populate('eventId', 'title description date venue category status')
      .sort({ registrationDate: -1 })
      .limit(10);
    
    const events = registrations.map(reg => ({
      id: reg._id,
      title: reg.eventId?.title || 'Event',
      description: reg.eventId?.description || '',
      date: reg.eventId?.date || new Date(),
      venue: reg.eventId?.venue || 'TBA',
      category: reg.eventId?.category || 'Other',
      status: reg.eventId?.status || 'Upcoming',
      registrationStatus: reg.status,
      registrationDate: reg.registrationDate
    }));
    
    res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Get user events error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching events' 
    });
  }
};

// 🔥 GET USER STATS
export const getUserStats = async (req, res) => {
  try {
    // Events joined (all registrations)
    const eventsJoined = await EventRegistration.countDocuments({ 
      userId: req.user._id 
    });
    
    // Events hosted (if user is admin/club)
    const eventsHosted = await Event.countDocuments({ 
      hostId: req.user._id 
    });
    
    // Certificates earned
    const certificates = await Certificate.countDocuments({ 
      userId: req.user._id 
    });
    
    // Get profile completion
    const profile = await UserProfile.findOne({ userId: req.user._id });
    const profileCompletion = profile ? profile.profileCompletion : 0;
    
    // For connections, we'll use a simplified approach
    // Count users who registered for same events
    const userRegistrations = await EventRegistration.find({ userId: req.user._id })
      .select('eventId');
    
    const eventIds = userRegistrations.map(reg => reg.eventId);
    
    const uniqueConnections = await EventRegistration.aggregate([
      { $match: { 
        eventId: { $in: eventIds },
        userId: { $ne: req.user._id } 
      }},
      { $group: { _id: '$userId' } },
      { $count: 'connections' }
    ]);
    
    const connections = uniqueConnections.length > 0 ? uniqueConnections[0].connections : 0;
    
    res.status(200).json({
      success: true,
      stats: {
        eventsJoined,
        eventsHosted,
        certificates,
        connections,
        profileCompletion
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching stats' 
    });
  }
};

// 🔥 UPDATE SKILLS
export const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    
    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Skills must be an array'
      });
    }
    
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      { 
        skills,
        updatedAt: Date.now()
      },
      { new: true, upsert: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Skills updated successfully',
      skills: profile.skills
    });
  } catch (error) {
    console.error('Update skills error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update skills' 
    });
  }
};

// 🔥 UPDATE INTERESTS
export const updateInterests = async (req, res) => {
  try {
    const { interests } = req.body;
    
    if (!Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        message: 'Interests must be an array'
      });
    }
    
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      { 
        interests,
        updatedAt: Date.now()
      },
      { new: true, upsert: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Interests updated successfully',
      interests: profile.interests
    });
  } catch (error) {
    console.error('Update interests error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update interests' 
    });
  }
};

// 🔥 GET USER CERTIFICATES
export const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.user._id })
      .populate('eventId', 'title date')
      .sort({ issuedDate: -1 });
    
    res.status(200).json({
      success: true,
      certificates
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching certificates' 
    });
  }
};