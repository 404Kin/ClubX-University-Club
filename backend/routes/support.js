const express = require('express');
const User = require('../models/User');
const Club = require('../models/Club');
const SupportThread = require('../models/SupportThread');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

async function getAccount(req) {
  return User.findById(req.auth.id).select('name email role clubId club').lean();
}

function canAccessThread(thread, account) {
  if (account.role === 'admin') return true;
  if (account.role === 'student') return thread.studentId === account._id.toString();
  return account.role === 'executive' &&
    thread.recipient === 'executive' &&
    thread.clubId === account.clubId;
}

router.get('/', authenticate, async (req, res) => {
  try {
    const account = await getAccount(req);
    if (!account) return res.status(401).json({ message: 'Account not found.' });
    let filter;
    if (account.role === 'student') {
      filter = { studentId: account._id.toString() };
    } else if (account.role === 'executive') {
      if (!account.clubId) return res.json([]);
      filter = { recipient: 'executive', clubId: account.clubId };
    } else if (account.role === 'admin') {
      filter = {};
    } else {
      return res.status(403).json({ message: 'You do not have permission to view support messages.' });
    }
    const threads = await SupportThread.find(filter).sort({ updatedAt: -1 }).lean();
    res.json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const account = await getAccount(req);
    if (!account || account.role !== 'student') {
      return res.status(403).json({ message: 'Only students can start a support conversation.' });
    }
    const text = typeof req.body.text === 'string' ? req.body.text.trim() : '';
    const recipient = req.body.recipient === 'executive' ? 'executive' : 'admin';
    if (!text || text.length > 2000) {
      return res.status(400).json({ message: 'Message must contain 1 to 2000 characters.' });
    }
    let club = null;
    if (recipient === 'executive') {
      club = await Club.findById(req.body.clubId).select('name').lean();
      if (!club) return res.status(400).json({ message: 'Choose a valid club executive.' });
    }
    const thread = await SupportThread.create({
      studentId: account._id.toString(),
      studentName: account.name,
      studentEmail: account.email,
      recipient,
      clubId: club ? req.body.clubId : null,
      clubName: club?.name || '',
      subject: text.slice(0, 80),
      messages: [{
        senderId: account._id.toString(),
        senderName: account.name,
        senderRole: 'student',
        text,
      }],
    });
    res.status(201).json(thread);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/:id/messages', authenticate, async (req, res) => {
  try {
    const account = await getAccount(req);
    if (!account) return res.status(401).json({ message: 'Account not found.' });
    const text = typeof req.body.text === 'string' ? req.body.text.trim() : '';
    if (!text || text.length > 2000) {
      return res.status(400).json({ message: 'Message must contain 1 to 2000 characters.' });
    }
    const thread = await SupportThread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Support conversation not found.' });
    if (!canAccessThread(thread, account)) {
      return res.status(403).json({ message: 'You do not have access to this conversation.' });
    }
    thread.messages.push({
      senderId: account._id.toString(),
      senderName: account.name,
      senderRole: account.role,
      text,
    });
    thread.updatedAt = new Date();
    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
