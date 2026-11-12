const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  ticketId: { type: String, required: true },
  registrationId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventRegistration', required: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

attendanceSchema.index({ eventId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);