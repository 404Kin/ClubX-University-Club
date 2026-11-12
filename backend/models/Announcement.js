const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  priority: { type: String, default: 'normal' },
  audience: { type: String, default: 'all' },
  clubId: { type: String, default: null, index: true },
  clubName: { type: String, default: null },
  createdBy: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);