const express = require('express');
const EventRegistration = require('../models/EventRegistration');
const Event = require('../models/Event');
const router = express.Router();

// Get all registrations (Optional, for admin/executive view)
router.get('/', async (req, res) => {
  try {
    const regs = await EventRegistration.find().sort({ createdAt: -1 });
    res.json(regs);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// Create a new event registration
router.post('/', async (req, res) => {
  let seatReserved = false;
  try {
    const { eventId, ticketId, studentName, studentId, email } = req.body;
    if (!eventId || !ticketId || !studentName || !studentId || !email) {
      return res.status(400).json({ message: 'Event, ticket, and student details are required.' });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    const duplicate = await EventRegistration.findOne({ eventId, studentId });
    if (duplicate) return res.status(409).json({ message: 'You are already registered for this event.' });

    const reservedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        $or: [
          { registered: { $lt: event.total } },
          { registered: { $exists: false } },
          { registered: null },
        ],
      },
      { $inc: { registered: 1 } },
      { new: true }
    );
    if (!reservedEvent) return res.status(409).json({ message: 'This event has no remaining seats.' });
    seatReserved = true;

    const newReg = await EventRegistration.create({
      eventId,
      ticketId,
      studentName,
      studentId,
      email,
      department: req.body.department,
      phone: req.body.phone,
    });

    res.status(201).json(newReg);
  } catch (err) { 
    if (seatReserved) {
      await Event.findByIdAndUpdate(req.body.eventId, { $inc: { registered: -1 } });
    }
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This ticket or student registration already exists.' });
    }
    res.status(500).json({ error: err.message }); 
  }
});

module.exports = router;