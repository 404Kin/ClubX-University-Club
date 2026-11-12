const express = require('express');
const Registration = require('../models/Registration');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const regs = await Registration.find().sort({ createdAt: -1 });
    res.json(regs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const newReg = await Registration.create(req.body);
    res.status(201).json(newReg);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;