const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
router.use(ensureLoggedIn);

// ALL paths start with '/'

router.get('/trackings', async (req, res) => {
  const category = req.query.category || '';
  const query = { trackedBy: req.user._id };
  if (category) query.category = category;
  const sort = req.query.sort || 'name';
  const items = await Item.find(query).sort(sort);
  const categories = await Item.distinct('category', { trackedBy: req.user._id });
  res.render('items/index.ejs', { items, category, sort, title: 'My Tracked Items', categories });
});

router.post('/items/:id/trackings', async (req, res) => {
  await Item.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { trackedBy: req.user._id } }
  );
  res.redirect(`/items/${req.params.id}`);
});

router.delete('/items/:id/trackings', async (req, res) => {
  await Item.findByIdAndUpdate(
    req.params.id,
    { $pull: { trackedBy: req.user._id } }
  );
  res.redirect(`/items/${req.params.id}`);
});

module.exports = router;