const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const urlRoutes = require('./routes/medical');

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use('/', urlRoutes);

mongoose.connect('mongodb://localhost:27017/miners');

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});

