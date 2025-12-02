const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();

app.use(cors({ origin: ['http://localhost:5173','https://two200270130188.onrender.com'] }));

const urlRoutes = require('./routes/medical');
app.use(express.json());
app.use('/', urlRoutes);


app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});

