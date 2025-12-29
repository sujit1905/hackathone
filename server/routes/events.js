import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// ✅ MAIN GET ROUTE - Returns ALL public events
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Fetching events for frontend...');
    
    // Get ALL events that should be visible
    const events = await Event.find({
      $or: [
        { visibility: 'public' },
        { visibility: { $exists: false } },
        { visibility: null },
        { visibility: '' }
      ]
    })
    .sort({ createdAt: -1 })
    .select('-__v')
    .lean();
    
    console.log(`📊 Found ${events.length} events in database`);
    
    if (events.length > 0) {
      console.log('📋 Event visibility check:');
      events.slice(0, 3).forEach((event, index) => {
        console.log(`  ${index + 1}. "${event.title}" - visibility: "${event.visibility}"`);
      });
    }
    
    // Process events with safe defaults
    const eventsWithDefaults = events.map(event => {
      return {
        _id: event._id,
        title: event.title || 'Untitled Event',
        description: event.description || 'Event description',
        date: event.date || new Date(),
        time: event.time || '10:00 AM',
        location: event.location || 'Online',
        mode: event.mode || 'online',
        feeType: event.feeType || 'free',
        fee: event.fee || 0,
        registrationStatus: event.registrationStatus || 'open',
        regOpens: event.regOpens || null,
        regCloses: event.regCloses || null,
        org: event.org || 'CLG EventHub',
        participants: event.participants || 'Unlimited',
        image: event.image || '/images/events01.png',
        reach: event.reach || 0,
        // Handle visibility properly
        visibility: event.visibility || 'public',
        // Only true if explicitly true
        isFeatured: event.isFeatured === true,
        createdBy: event.createdBy || null,
        createdAt: event.createdAt || new Date(),
        updatedAt: event.updatedAt || new Date()
      };
    });
    
    const featuredCount = eventsWithDefaults.filter(e => e.isFeatured).length;
    
    console.log(`📤 Sending ${eventsWithDefaults.length} events to frontend`);
    console.log(`⭐ Featured events: ${featuredCount}`);
    
    res.json(eventsWithDefaults);
  } catch (error) {
    console.error('❌ Events fetch error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch events',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ✅ DEBUG ENDPOINT: Check what's in database
router.get('/debug-all', async (req, res) => {
  try {
    const allEvents = await Event.find({}).lean();
    
    const debugData = allEvents.map(event => ({
      _id: event._id?.toString().substring(0, 8) + '...',
      title: event.title,
      visibility: event.visibility,
      isFeatured: event.isFeatured,
      createdBy: event.createdBy,
      date: event.date,
      fields: Object.keys(event)
    }));
    
    console.log('🐛 DEBUG - All events in database:');
    debugData.forEach((event, index) => {
      console.log(`  ${index + 1}. "${event.title}"`);
      console.log(`     Visibility: "${event.visibility}"`);
      console.log(`     isFeatured: ${event.isFeatured}`);
      console.log(`     CreatedBy: ${event.createdBy}`);
    });
    
    res.json({
      total: allEvents.length,
      events: debugData,
      note: 'Check server console for detailed logs'
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET ALL EVENTS (no filter - for testing)
router.get('/all', async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ CREATE EVENT (Admin only)
router.post('/', async (req, res) => {
  try {
    // For now, allow anyone to create events (remove protect middleware temporarily)
    const eventData = {
      ...req.body,
      visibility: req.body.visibility || 'public',
      isFeatured: req.body.isFeatured || false,
      mode: req.body.mode || 'online',
      feeType: req.body.feeType || 'free',
      registrationStatus: req.body.registrationStatus || 'open'
    };
    
    console.log('📝 Creating event with data:', {
      title: eventData.title,
      visibility: eventData.visibility,
      isFeatured: eventData.isFeatured
    });
    
    const event = new Event(eventData);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;