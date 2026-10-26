const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  category: { type: String, default: 'Workshop' },
  description: { type: String },
  total: { type: Number, default: 50 },
  registered: { type: Number, default: 0 },
  createdBy: { type: String, required: true }, 
  src: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);