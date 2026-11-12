const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  senderRole: { type: String, enum: ['student', 'executive', 'admin'], required: true },
  text: { type: String, required: true, maxlength: 2000 },
}, { timestamps: true });

const supportThreadSchema = new mongoose.Schema({
  studentId: { type: String, required: true, index: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  recipient: { type: String, enum: ['admin', 'executive'], required: true, index: true },
  clubId: { type: String, default: null, index: true },
  clubName: { type: String, default: '' },
  subject: { type: String, default: 'ClubX Support' },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  messages: [messageSchema],
}, { timestamps: true });

supportThreadSchema.index({ updatedAt: -1 });

module.exports = mongoose.model('SupportThread', supportThreadSchema);
