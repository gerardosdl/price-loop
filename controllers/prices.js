const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
router.use(ensureLoggedIn);

// ALL paths start with '/'

router.post('/items/:id/prices', async (req, res) => {
  try {
    req.body.user = req.user._id;
    await Item.findByIdAndUpdate(
      req.params.id, 
      { $push: { prices: req.body } }
    );
    res.redirect(`/items/${req.params.id}`);
  }catch (err) {
    console.log(err);
    res.redirect(`/items/${req.params.id}`);
  }
});

router.delete('/prices/:id', async (req, res) => {
  const item = await Item.findOne({ 'prices._id' : req.params.id });
  item.prices = item.prices.filter(price => price._id.toString() !== req.params.id);
  await item.save();
  res.redirect(`/items/${item._id}`); 
});

module.exports = router;