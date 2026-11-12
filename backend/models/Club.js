const mongoose = require('mongoose');

const infoItemSchema = new mongoose.Schema({
  label: String,
  value: String,
  href: String,
}, { _id: false });

const announcementSchema = new mongoose.Schema({
  title: String,
  date: String,
  desc: String,
  more: String,
  priority: String,
}, { _id: false });

const memberSchema = new mongoose.Schema({
  name: String,
  role: String,
  dept: String,
}, { _id: false });

const achievementSchema = new mongoose.Schema({
  title: String,
  year: String,
  desc: String,
}, { _id: false });

const benefitSchema = new mongoose.Schema({
  title: String,
  desc: String,
}, { _id: false });

const executiveSchema = new mongoose.Schema({
  name: String,
  position: String,
  email: String,
  department: String,
  batch: String,
}, { _id: false });

const aboutSchema = new mongoose.Schema({
  history: String,
  mission: String,
  vision: String,
  activities: [String],
  contact: [infoItemSchema],
}, { _id: false });

const requirementsSchema = new mongoose.Schema({
  who: [String],
  eligibility: [String],
  joining: [String],
  conditions: [String],
}, { _id: false });

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  short: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  tagline: { type: String, default: '' },
  image: { type: String, default: '' },
  hue: { type: Number, min: 0, max: 360 },
  featured: { type: Boolean, default: false },
  executive: { type: String },
  members: { type: Number, default: 0 },
  info: [infoItemSchema],
  stats: [{ label: String, value: mongoose.Schema.Types.Mixed }],
  announcements: [announcementSchema],
  memberProfiles: [memberSchema],
  requirements: requirementsSchema,
  achievements: [achievementSchema],
  about: aboutSchema,
  benefits: [benefitSchema],
  executives: [executiveSchema],
  membership: {
    fee: { type: Number, min: 0 },
    period: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);