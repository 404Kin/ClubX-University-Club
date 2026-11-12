const express = require('express');
const Announcement = require('../models/Announcement');
const Club = require('../models/Club');
const { authenticate, requireRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.clubId) filter.clubId = req.query.clubId;
    else if (req.query.clubName) filter.clubName = req.query.clubName;
    const query = Announcement.find(filter).sort({ createdAt: -1 });
    const limit = Number.parseInt(req.query.limit, 10);
    if (Number.isInteger(limit) && limit > 0) query.limit(Math.min(limit, 100));
    const anns = await query.lean();
    res.json(anns);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found.' });
    res.json(announcement);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.post('/', authenticate, requireRole('executive'), async (req, res) => {
  try {
    const { title, body, priority } = req.body;
    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({ message: 'Announcement title and message are required.' });
    }
    const club = req.auth.clubId
      ? await Club.findById(req.auth.clubId)
      : await Club.findOne({ name: req.auth.club });
    if (!club) return res.status(404).json({ message: 'Your assigned club was not found.' });
    const newAnn = await Announcement.create({
      title: title.trim(),
      body: body.trim(),
      priority: priority === 'high' ? 'high' : 'normal',
      audience: 'all',
      clubId: club._id.toString(),
      clubName: club.name,
      createdBy: req.auth.id,
    });
    res.status(201).json(newAnn);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;