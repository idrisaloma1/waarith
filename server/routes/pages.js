const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => res.json(db.pages.filter(p => p.published)));
router.get('/:slug', (req, res) => {
  const page = db.pages.find(p => p.slug === req.params.slug);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
});
router.put('/:slug', auth, (req, res) => {
  const idx = db.pages.findIndex(p => p.slug === req.params.slug);
  if (idx === -1) return res.status(404).json({ error: 'Page not found' });
  db.pages[idx] = { ...db.pages[idx], ...req.body };
  res.json(db.pages[idx]);
});

module.exports = router;
