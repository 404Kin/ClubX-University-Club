const mongoose = require('mongoose');
const registrationSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  ticketId: { type: String, required: true },
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String },
  phone: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Registration', registrationSchema);