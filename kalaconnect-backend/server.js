const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ── Health check ─────────────────────────── */
app.get('/', (req, res) => {
  res.json({ message: 'KalaConnect API is running 🎭' });
});

/* ── Routes (stubs — to be built per phase) ── */
app.use('/api/artists',  require('./routes/artists'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/auth',     require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`✅ KalaConnect server running on http://localhost:${PORT}`);
});
