const express = require('express');
const router = express.Router();
const { predictPrice } = require('../models/modelWrapper');

router.post('/predict', async (req, res) => {
  try {
    const { bedrooms, bathrooms, parking } = req.body;
    const prediction = await predictPrice(bedrooms, bathrooms, parking);
    res.json({ prediction });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while making the prediction' });
  }
});

module.exports = router;