import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// ✅ STUDENTS SEE ALL EVENTS
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
