const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/', (req, res) => {
  const application = { id: db.nextId.admissions++, ...req.body, status: 'pending', createdAt: new Date().toISOString() };
  db.admissions.push(application);
  res.status(201).json({ success: true, message: 'Application submitted successfully', id: application.id });
});

router.get('/', auth, (req, res) => res.json(db.admissions));

router.put('/:id', auth, (req, res) => {
  const idx = db.admissions.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.admissions[idx] = { ...db.admissions[idx], ...req.body };
  res.json(db.admissions[idx]);
});

module.exports = router;
