const router = require('express').Router();

// POST /api/bookings - create a booking (stub)
router.post('/', (req, res) => {
  res.json({ message: 'Booking created — coming soon', data: req.body });
});

// GET /api/bookings/:id - get booking details (stub)
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, message: 'Booking details — coming soon' });
});

module.exports = router;
