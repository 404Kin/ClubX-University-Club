const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  short: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  executive: { type: String },
  members: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);