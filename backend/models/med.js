const mongoose=require('mongoose')

const urlSchema =mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  expiry: { type: Date, required: true }
});

module.exports=mongoose.model('Url', urlSchema);