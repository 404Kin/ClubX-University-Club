const express = require('express');
const Event = require('../models/Event');
const Club = require('../models/Club');
const { authenticate, requireRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = req.query.clubId
      ? {
        $or: [
          { clubId: req.query.clubId },
          { createdBy: req.query.createdBy },
        ],
      }
      : {};
    const query = Event.find(filter).sort({ createdAt: -1 });
    if (req.query.activity === 'true') {
      query.select('title date venue category clubName createdAt');
    }
    const events = await query.lean();
    res.json(events);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', authenticate, requireRole('executive'), async (req, res) => {
  try {
    const club = req.auth.clubId
      ? await Club.findById(req.auth.clubId)
      : await Club.findOne({ name: req.auth.club });
    if (!club) return res.status(404).json({ message: 'Your assigned club was not found.' });
    const newEvent = await Event.create({
      ...req.body,
      createdBy: req.auth.id,
      clubId: club._id.toString(),
      clubName: club.name,
    });
    res.status(201).json(newEvent);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

module.exports = router;