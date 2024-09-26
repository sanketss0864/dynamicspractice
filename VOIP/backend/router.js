const express = require('express');
const { tokenGenerator, voiceResponse } = require('./handler');
const router = express.Router();
router.get('/token', (req, res) => {
  res.send(tokenGenerator());
});
router.post('/voice', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(voiceResponse(req.body));
});
module.exports = router;