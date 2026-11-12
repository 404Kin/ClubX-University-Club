const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  ticketId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String },
  phone: { type: String },
}, { timestamps: true });

eventRegistrationSchema.index({ eventId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);