const router = require('express').Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  res.json({ message: 'Register — coming soon', data: req.body });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  res.json({ message: 'Login — coming soon' });
});

module.exports = router;
