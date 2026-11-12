// backend/routes/attendance.js
const express = require('express');
const Attendance = require('../models/Attendance');
const EventRegistration = require('../models/EventRegistration');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = req.query.eventId ? { eventId: req.query.eventId } : {};
    const records = await Attendance.find(filter).sort({ timestamp: -1 });
    res.json(records);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

const scanTicket = async (req, res) => {
  try {
    const { eventId, ticketId } = req.body;
    if (!eventId || !ticketId || typeof ticketId !== 'string') {
      return res.status(400).json({ message: 'Event ID and ticket ID are required.' });
    }

    const registration = await EventRegistration.findOne({
      eventId,
      ticketId: ticketId.trim(),
    });
    if (!registration) {
      return res.status(404).json({ message: 'Ticket is invalid for this event.' });
    }

    const existing = await Attendance.findOne({ eventId, studentId: registration.studentId });
    if (existing) {
      return res.status(409).json({ message: 'Attendance has already been recorded for this ticket.' });
    }

    const newRecord = await Attendance.create({
      eventId: registration.eventId,
      ticketId: registration.ticketId,
      registrationId: registration._id,
      studentId: registration.studentId,
      studentName: registration.studentName,
    });
    res.status(201).json(newRecord);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Attendance has already been recorded for this ticket.' });
    }
    res.status(500).json({ error: err.message });
  }
};

router.post('/scan', scanTicket);

module.exports = router;