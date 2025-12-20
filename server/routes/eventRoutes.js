import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  bookmarkEvent,
  registerForEvent,
  getUserEvents,
  adminStats,
} from "../controllers/eventController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getEvents).post(protect, adminOnly, createEvent);

router.get("/user/me", protect, getUserEvents);
router.get("/admin/stats", protect, adminOnly, adminStats);

router
  .route("/:id")
  .get(getEventById)
  .put(protect, adminOnly, updateEvent)
  .delete(protect, adminOnly, deleteEvent);

router.post("/:id/bookmark", protect, bookmarkEvent);
router.post("/:id/register", protect, registerForEvent);

export default router;
