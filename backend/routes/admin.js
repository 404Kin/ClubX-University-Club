const express = require('express');
const User = require('../models/User');
const Club = require('../models/Club');
const Event = require('../models/Event');
const Membership = require('../models/Membership');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', authenticate, requireRole('admin'), async (_req, res) => {
  try {
    const [users, events, clubs, executives, members] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Club.countDocuments(),
      User.countDocuments({ role: 'executive' }),
      Membership.countDocuments({ status: 'Approved' }),
    ]);
    res.json({ users, events, clubs, executives, members });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
