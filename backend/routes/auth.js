const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Club = require('../models/Club');
const router = express.Router();

//sign up
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, club, position } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student',
      club: club || null,
      position: position || null
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    let isMatch = false;
    
    // If password in DB is hashed by bcrypt (usually starts with $2a$ or $2b$)
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // If password in DB is plain text
      isMatch = password === user.password;
    }

    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const clubId = user.clubId || null;
    const clubDoc = clubId && /^[a-f\d]{24}$/i.test(clubId)
      ? await Club.findById(clubId).select('name')
      : null;
    const club = clubDoc?.name || user.club || null;

    const token = jwt.sign(
      { id: user._id, role: user.role, clubId, club },
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clubId,
        club,
        position: user.position
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;