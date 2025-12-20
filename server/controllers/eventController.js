import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const { title, description, date, time, venue, category } =
    req.body;

  const event = await Event.create({
    title,
    description,
    date,
    time,
    venue,
    category,
    createdBy: req.user._id,
  });

  res.status(201).json(event);
};

export const getEvents = async (req, res) => {
  const { category, status, search } = req.query;

  const query = {};
  if (category && category !== "all") query.category = category;
  if (search)
    query.title = { $regex: search, $options: "i" };

  let events = await Event.find(query)
    .populate("createdBy", "name")
    .sort({ date: 1 });

  const now = new Date();
  if (status === "upcoming") {
    events = events.filter((e) => new Date(e.date) >= now);
  } else if (status === "past") {
    events = events.filter((e) => new Date(e.date) < now);
  }

  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "createdBy",
    "name"
  );
  if (!event) return res.status(404).json({ message: "Not found" });
  res.json(event);
};

export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Not found" });

  if (event.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only creator can update" });
  }

  const fields = [
    "title",
    "description",
    "date",
    "time",
    "venue",
    "category",
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) event[f] = req.body[f];
  });

  const updated = await event.save();
  res.json(updated);
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Not found" });

  if (event.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only creator can delete" });
  }

  await event.deleteOne();
  res.json({ message: "Event removed" });
};

export const bookmarkEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Not found" });

  const userId = req.user._id.toString();
  const exists = event.bookmarkedBy
    .map((id) => id.toString())
    .includes(userId);
  if (exists) {
    return res
      .status(400)
      .json({ message: "Already bookmarked" });
  }

  event.bookmarkedBy.push(userId);
  await event.save();
  res.json({ message: "Bookmarked" });
};

export const registerForEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Not found" });

  const userId = req.user._id.toString();
  const exists = event.registeredUsers
    .map((id) => id.toString())
    .includes(userId);
  if (exists) {
    return res
      .status(400)
      .json({ message: "Already registered" });
  }

  event.registeredUsers.push(userId);
  await event.save();
  res.json({ message: "Registered" });
};

export const getUserEvents = async (req, res) => {
  const userId = req.user._id;

  const bookmarked = await Event.find({
    bookmarkedBy: userId,
  }).sort({ date: 1 });

  const registered = await Event.find({
    registeredUsers: userId,
  }).sort({ date: 1 });

  res.json({ bookmarked, registered });
};

export const adminStats = async (req, res) => {
  const userId = req.user._id;

  const events = await Event.find({ createdBy: userId });
  const totalEvents = events.length;
  const totalRegistrations = events.reduce(
    (sum, e) => sum + e.registeredUsers.length,
    0
  );

  res.json({ totalEvents, totalRegistrations, events });
};
