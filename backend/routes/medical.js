const express = require('express');
const router = express.Router();
const Url = require('../models/med'); 
const  { nanoid } =require('nanoid')


router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl, expiryHours } = req.body;

    if (!originalUrl || !expiryHours) {
      return res.status(400).json({ error: 'Missing originalUrl or expiryHours' });
    }

    const shortcode = nanoid(6);
    const expiryDate = new Date(Date.now() + expiryHours * 60 * 60 * 1000);

    const newUrl = new Url({
      originalUrl,
      shortcode,
      expiry: expiryDate
    });

    await newUrl.save();


    const shortLink = `http://localhost:3000/${shortcode}`;

    res.json({ shortLink, expiry: expiryDate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await Url.findOne({ shortcode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    if (new Date() > urlDoc.expiry) {
      return res.status(410).json({ error: 'Link has expired' });
    }

    return res.redirect(urlDoc.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
