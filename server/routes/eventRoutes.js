// server/routes/eventRoutes.js - GET route
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Fetching events for frontend...');
    
    // 🔧 FIX: Get ALL events with comprehensive filtering
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
    .lean(); // Use lean() for better performance
    
    console.log(`📊 Found ${events.length} events in database`);
    
    if (events.length > 0) {
      console.log('📋 Event visibility check:');
      events.slice(0, 3).forEach((event, index) => {
        console.log(`  ${index + 1}. "${event.title}" - visibility: "${event.visibility}" (type: ${typeof event.visibility})`);
      });
    }
    
    // 🔧 FIX: Proper default values with fallbacks
    const eventsWithDefaults = events.map(event => {
      const processedEvent = {
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
        // 🔧 CRITICAL FIX: Handle all visibility cases
        visibility: (() => {
          const vis = event.visibility;
          if (vis === 'public' || vis === 'private') return vis;
          if (vis === undefined || vis === null || vis === '') return 'public';
          return 'public'; // Default fallback
        })(),
        // 🔧 FIX: Only mark as featured if explicitly true
        isFeatured: event.isFeatured === true,
        createdBy: event.createdBy || null,
        createdAt: event.createdAt || new Date(),
        updatedAt: event.updatedAt || new Date()
      };
      
      return processedEvent;
    });
    
    // Filter featured events (only those with isFeatured: true)
    const featuredCount = eventsWithDefaults.filter(e => e.isFeatured).length;
    
    console.log(`📤 Sending ${eventsWithDefaults.length} events to frontend`);
    console.log(`⭐ Featured events: ${featuredCount}`);
    console.log('📝 Sample event:', {
      title: eventsWithDefaults[0]?.title,
      visibility: eventsWithDefaults[0]?.visibility,
      isFeatured: eventsWithDefaults[0]?.isFeatured,
      createdBy: eventsWithDefaults[0]?.createdBy
    });
    
    res.json(eventsWithDefaults);
  } catch (error) {
    console.error('❌ Events fetch error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch events',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 🔍 DEBUG ENDPOINT: Check what's in database
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
      console.log(`     Visibility: "${event.visibility}" (type: ${typeof event.visibility})`);
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