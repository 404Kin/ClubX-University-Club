const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.MONGODB_DB_NAME 
})
  .then(() => {
    console.log(`✅ Connected to MongoDB - Database: ${process.env.MONGODB_DB_NAME}`);
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log('❌ DB Connection Error:', err));