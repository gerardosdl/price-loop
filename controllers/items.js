const express = require('express');
const router = express.Router();
const Item = require('../models/item');

const ensureLoggedIn = require('../middleware/ensure-logged-in');

// ALL paths start with '/items'

// Index: GET /items-Show all items
router.get('/', async (req, res) => {
  const category = req.query.category || '';
  const query = category ? { category } : {};
  const sort = req.query.sort || 'name';
  const items = await Item.find(query).sort(sort);
  const categories = await Item.distinct('category');
  res.render('items/index.ejs', { items, category, sort, title: 'All Items', categories });
});

// New Item Form
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('items/new.ejs');
});

// Create Item
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    req.body.user = req.user._id;
    await Item.create(req.body);
    res.redirect('/items');
  } catch (err) {
    res.redirect('/items/new');
  }
});

// Show one Item
router.get('/:id', ensureLoggedIn, async (req, res) => {
  const item = await Item.findById(req.params.id)
    .populate('user')
    .populate('prices.user')
    .populate('trackedBy');
  const isTracked = item.trackedBy.some((id) => id.equals(req.user._id));
  res.render('items/show.ejs', { item, isTracked })
});

// Delete Item
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item.user.equals(req.user._id)) {
      await item.deleteOne();
      res.redirect('/items');
    } else {
      res.send("You are not permitted to delete this item");
    }
  } catch (err) {
    res.redirect('/');
  } 
});

// Edit Form
router.get('/:id/edit', ensureLoggedIn, async (req, res) => {
  try {
    const currentItem = await Item.findById(req.params.id);
    res.render('items/edit.ejs', {
      item: currentItem,
    }); 
  } catch (err) {
    res.redirect('/');
  }
});

// Update Item
router.put('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const currentItem = await Item.findById(req.params.id);
    if (currentItem.user.equals(req.user._id)) {
      await currentItem.updateOne(req.body);
      res.redirect('/items');
    } else {
      res.send("Denied");
      }
    } catch (err) {
      res.redirect('/');
  }
});

module.exports = router;