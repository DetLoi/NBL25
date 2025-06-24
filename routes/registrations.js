const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { sendConfirmation, sendNotification } = require('../mailer');

// POST /api/registrations
router.post('/', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    const saved = await registration.save();

    await Promise.all([
      sendConfirmation(saved),
      sendNotification(saved)
    ]);

    res.status(201).json(saved);
  }catch (err) {
    console.error('Registration error:', err);

    // Check if it's a SendGrid ResponseError
    if (err.response && err.response.body && err.response.body.errors) {
      console.error('SendGrid error details:', err.response.body.errors);
    }

    res.status(500).json({
      error: 'Failed to register user',
      message: err.response?.body?.errors?.[0]?.message || err.message || 'Unknown error',
    });
  }
});

// GET /api/registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// DELETE /api/registrations/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json({ message: 'Registration deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete registration' });
  }
});

module.exports = router;
