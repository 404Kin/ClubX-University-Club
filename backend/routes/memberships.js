const express = require('express');
const Membership = require('../models/Membership');
const Club = require('../models/Club');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

async function countApprovedMembers(filter) {
  const [result] = await Membership.aggregate([
    { $match: { ...filter, status: 'Approved' } },
    { $group: { _id: { $toLower: '$email' } } },
    { $count: 'count' },
  ]);
  return result?.count || 0;
}

router.get('/mine', authenticate, async (req, res) => {
  try {
    if (req.auth.role !== 'student') {
      return res.status(403).json({ message: 'Student accounts only.' });
    }
    const student = await User.findById(req.auth.id).select('email').lean();
    if (!student) return res.status(401).json({ message: 'Student account not found.' });
    const escapedEmail = student.email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const memberships = await Membership.find({ email: new RegExp(`^${escapedEmail}$`, 'i') })
      .sort({ createdAt: -1 })
      .lean();
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/club/:clubId/members', async (req, res) => {
  try {
    const records = await Membership.find({
      clubId: req.params.clubId,
      status: 'Approved',
    })
      .select('email studentName department batch')
      .sort({ studentName: 1 })
      .lean();
    const uniqueMembers = new Map();
    records.forEach((member) => {
      const email = member.email.toLowerCase();
      if (!uniqueMembers.has(email)) {
        uniqueMembers.set(email, {
          studentName: member.studentName,
          department: member.department,
          batch: member.batch,
        });
      }
    });
    res.json([...uniqueMembers.values()]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const { club, clubId } = req.query;
    let filter = {};
    if (!['admin', 'executive'].includes(req.auth.role)) {
      return res.status(403).json({ message: 'You do not have permission to view membership applications.' });
    }
    if (req.auth.role === 'executive' || clubId) {
      const executiveClubId = req.auth.role === 'executive' ? req.auth.clubId : clubId;
      const linkedClub = executiveClubId
        ? await Club.findById(executiveClubId)
        : req.auth.role === 'executive' && req.auth.club
          ? await Club.findOne({ name: req.auth.club })
          : null;
      if (!linkedClub) return res.status(404).json({ message: 'Club not found' });
      filter = {
        $or: [
          { clubId: linkedClub._id.toString() },
          { clubId: null, clubName: linkedClub.name },
        ],
      };
    } else if (club) {
      filter = { clubName: club };
    }

    const memberships = await Membership.find(filter).sort({ createdAt: -1 });
    res.json(memberships);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.post('/', async (req, res) => {
  try {
    const { studentName, studentId, email, clubId, clubName } = req.body;
    if (!studentName || !studentId || !email || !clubId || !clubName) {
      return res.status(400).json({ message: 'Student and club details are required.' });
    }
    const linkedClub = await Club.findById(clubId);
    if (!linkedClub) return res.status(404).json({ message: 'Club not found' });
    const normalizedEmail = email.trim().toLowerCase();
    const existingApplication = await Membership.findOne({
      clubId: linkedClub._id.toString(),
      status: { $in: ['Pending', 'Approved'] },
      $or: [
        { email: normalizedEmail },
        { studentId: studentId.trim() },
      ],
    });
    if (existingApplication) {
      return res.status(409).json({ message: 'You already have an active application for this club.' });
    }

    const newMembership = await Membership.create({
      studentName,
      studentId,
      email: normalizedEmail,
      clubId: linkedClub._id.toString(),
      clubName: linkedClub.name,
      phone: req.body.phone,
      department: req.body.department,
      semester: req.body.semester,
      batch: req.body.batch,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      txnId: req.body.txnId,
    });
    res.status(201).json(newMembership);
  } catch (err) { 
    res.status(400).json({ message: err.message }); 
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['admin', 'executive'].includes(req.auth.role)) {
      return res.status(403).json({ message: 'You do not have permission to update applications.' });
    }
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Pending, Approved, or Rejected.' });
    }
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: 'Membership not found' });
    const belongsToExecutiveClub = Boolean(req.auth.clubId && membership.clubId === req.auth.clubId) ||
      (!membership.clubId && membership.clubName === req.auth.club);
    if (req.auth.role === 'executive' && !belongsToExecutiveClub) {
      return res.status(403).json({ message: 'You can only review applications for your assigned club.' });
    }
    membership.status = status;
    const updated = await membership.save();
    if (!updated) return res.status(404).json({ message: 'Membership not found' });
    if (membership.clubId) {
      const approvedCount = await countApprovedMembers({ clubId: membership.clubId });
      await Club.findByIdAndUpdate(membership.clubId, {
        $set: { members: approvedCount },
      });
    } else {
      const approvedCount = await countApprovedMembers({ clubName: membership.clubName });
      await Club.findOneAndUpdate({ name: membership.clubName }, {
        $set: { members: approvedCount },
      });
    }
    res.json(updated);
  } catch (err) { 
    res.status(400).json({ message: err.message }); 
  }
});

module.exports = router;