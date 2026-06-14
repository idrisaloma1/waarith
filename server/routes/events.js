const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  const events = db.events.filter(e => e.published).sort((a, b) => new Date(a.date) - new Date(b.date));
  res.json(events);
});

router.get('/all', auth, (req, res) => {
  res.json(db.events.sort((a, b) => new Date(a.date) - new Date(b.date)));
});

router.post('/', auth, (req, res) => {
  const event = { id: db.nextId.events++, ...req.body, published: true };
  db.events.push(event);
  res.status(201).json(event);
});

router.put('/:id', auth, (req, res) => {
  const idx = db.events.findIndex(e => e.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });
  db.events[idx] = { ...db.events[idx], ...req.body };
  res.json(db.events[idx]);
});

router.delete('/:id', auth, (req, res) => {
  const idx = db.events.findIndex(e => e.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });
  db.events.splice(idx, 1);
  res.json({ success: true });
});

module.exports = router;
