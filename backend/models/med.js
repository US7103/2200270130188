const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_link)

const urlSchema =new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  expiry: { type: Date, required: true }
});

module.exports = mongoose.model('Url', urlSchema);
