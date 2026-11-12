const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  email: { type: String, required: true },
  clubId: { type: String, index: true },
  clubName: { type: String, required: true },
  phone: String,
  department: String,
  semester: String,
  batch: String,
  address: String,
  paymentMethod: String,
  txnId: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);