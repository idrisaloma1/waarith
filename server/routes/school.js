const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => res.json(db.school));
router.put('/', auth, (req, res) => {
  db.school = { ...db.school, ...req.body };
  res.json(db.school);
});

module.exports = router;
