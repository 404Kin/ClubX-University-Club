const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'executive', 'admin'], 
    default: 'student' 
  },
  
  clubId: { type: String, default: null },
  club: { type: String, default: null },
  position: { type: String, default: null },
  department: { type: String, default: null },
  studentId: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);