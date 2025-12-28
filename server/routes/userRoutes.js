import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserEvents,
  getUserStats,
  updateSkills,
  updateInterests,
  getUserCertificates
} from '../controllers/userProfileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Profile routes
router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.get('/events', getUserEvents);
router.get('/stats', getUserStats);
router.get('/certificates', getUserCertificates);
router.put('/skills', updateSkills);
router.put('/interests', updateInterests);

export default router;