const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const authMiddleware = require("../middleware/authMiddleware");

// Get all sessions
router.get("/", authMiddleware, async (req, res) => {
  const sessions = await Session.find({ user: req.user.id })
    .sort({ updatedAt: -1 });

  res.json(sessions);
});

// Create new session
router.post("/", authMiddleware, async (req, res) => {
  const session = await Session.create({
    user: req.user.id,
    title: "New Session",
    messages: [],
  });

  res.json(session);
});

// Update session (add message)
router.put("/:id", authMiddleware, async (req, res) => {
  const { message } = req.body;

  const session = await Session.findById(req.params.id);

  if (!session) return res.status(404).json({ message: "Not found" });

  session.messages.push(message);

  // Auto title generation (first message)
  if (session.messages.length === 1) {
    session.title = message.content.slice(0, 30);
  }

  await session.save();

  res.json(session);
});

// Delete session
router.delete("/:id", authMiddleware, async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.json({ message: "Session deleted" });
});

module.exports = router;