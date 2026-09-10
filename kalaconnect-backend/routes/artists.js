const router = require('express').Router();

// GET /api/artists - list all artists (stub)
router.get('/', (req, res) => {
  res.json({ artists: [], message: 'Artist listing — coming soon' });
});

// GET /api/artists/:id - artist profile (stub)
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, message: 'Artist profile — coming soon' });
});

module.exports = router;
