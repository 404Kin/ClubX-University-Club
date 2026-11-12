const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clubRoutes = require('./routes/clubs');
const eventRoutes = require('./routes/events');
const announcementRoutes = require('./routes/announcements');
const membershipRoutes = require('./routes/memberships');
const attendanceRoutes = require('./routes/attendance');
const registrationRoutes = require('./routes/registrations');
const eventRegistrationRoutes = require('./routes/eventRegistrations');
const adminRoutes = require('./routes/admin');
const supportRoutes = require('./routes/support');


require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json({ limit: '7mb' }));
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/event-registrations', eventRegistrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/support', supportRoutes);

mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.MONGODB_DB_NAME 
})
  .then(() => {
    console.log(`✅ Connected to MongoDB - Database: ${process.env.MONGODB_DB_NAME}`);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB Connection Error:', err);
    process.exitCode = 1;
  });