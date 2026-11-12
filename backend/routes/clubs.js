const express = require('express');
const bcrypt = require('bcryptjs');
const Club = require('../models/Club');
const User = require('../models/User');
const { authenticate, requireRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find()
      .select('name short category tagline hue featured members executive')
      .sort({ createdAt: -1 })
      .lean();
    const coverClub = clubs.find((club) => club.featured) || clubs[0];
    if (coverClub) {
      const cover = await Club.findById(coverClub._id).select('image').lean();
      coverClub.image = cover?.image || '';
    }
    res.json(clubs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/list', authenticate, requireRole('admin'), async (_req, res) => {
  try {
    const [clubs, executives] = await Promise.all([
      Club.find()
        .select('name short category tagline description hue featured members executive')
        .sort({ createdAt: -1 })
        .lean(),
      User.find({ role: 'executive' }).select('name email position clubId').lean(),
    ]);
    const executiveByClub = executives.reduce((grouped, executive) => {
      grouped[executive.clubId] = grouped[executive.clubId] || [];
      grouped[executive.clubId].push({
        id: executive._id,
        name: executive.name,
        email: executive.email,
        position: executive.position,
      });
      return grouped;
    }, {});
    res.json(clubs.map((club) => ({
      ...club,
      executiveAccounts: executiveByClub[club._id.toString()] || [],
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.json(club);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const allowed = ['name', 'short', 'category', 'description', 'tagline', 'image', 'hue', 'featured', 'info', 'requirements', 'about', 'benefits', 'achievements', 'membership'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key, value]) =>
        allowed.includes(key) && !(key === 'image' && value === '')
      )
    );
    if (updates.image && !/^data:image\/(?:jpeg|png|webp);base64,/.test(updates.image) &&
      !/^https?:\/\//i.test(updates.image)) {
      return res.status(400).json({ message: 'Club image must be a JPEG, PNG, WebP upload, or an HTTP URL.' });
    }
    const club = await Club.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!club) return res.status(404).json({ message: 'Club not found.' });
    res.json(club);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  try {
    if (req.body.image && !/^data:image\/(?:jpeg|png|webp);base64,/.test(req.body.image) &&
      !/^https?:\/\//i.test(req.body.image)) {
      return res.status(400).json({ message: 'Club image must be a JPEG, PNG, WebP upload, or an HTTP URL.' });
    }
    const newClub = await Club.create(req.body);
    res.status(201).json(newClub);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.post('/:id/executive', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const { name, email, password, position } = req.body;
    if (!name?.trim() || !email?.trim() || !password || !position?.trim()) {
      return res.status(400).json({ message: 'Name, email, password, and position are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found.' });
    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) return res.status(409).json({ message: 'An account already uses this email.' });
    const executive = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: await bcrypt.hash(password, 10),
      role: 'executive',
      clubId: club._id.toString(),
      club: club.name,
      position: position.trim(),
    });
    club.executives = [
      ...(club.executives || []),
      { name: executive.name, position: executive.position, email: executive.email },
    ];
    if (!club.executive) club.executive = executive.name;
    await club.save();

    res.status(201).json({
      executive: { id: executive._id, name: executive.name, email: executive.email, position: executive.position },
      club,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id/executives/:executiveId', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found.' });
    const executive = await User.findOneAndUpdate({
      _id: req.params.executiveId,
      role: 'executive',
      clubId: club._id.toString(),
    }, {
      $set: { role: 'student', clubId: null, club: null, position: null },
    });
    if (!executive) return res.status(404).json({ message: 'Executive not found for this club.' });
    club.executives = (club.executives || []).filter((item) => item.email !== executive.email);
    club.executive = club.executives[0]?.name || '';
    await club.save();
    res.json({ message: 'Executive removed.', club });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, requireRole('admin'), async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;