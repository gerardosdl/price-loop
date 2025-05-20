const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
router.use(ensureLoggedIn);

// ALL paths start with '/

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
    res.redirect(`/items/${req.params.id}`)
// TODO check for missing references
  }
});

router.delete('/prices/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (price.user.equals(req.user._id)) {
      await price.deleteOne();
      res.redirect(`/items/${req.params.id}`);
    } else {
      res.send("You are not permitted to delete this price");
    }
  } catch (err) {
    console.log(err);
    res.redirect(`/items/${req.params.id}`);
  } 
});

module.exports = router;