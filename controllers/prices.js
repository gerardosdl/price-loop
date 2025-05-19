const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
router.use(ensureLoggedIn);

// ALL paths start with '/'

// index action
// GET /items
// router.get('/', ensureLoggedIn, async (req, res) => {
//   const items = await Item.find({}).sort('-createdAt');
//   res.render('items/index.ejs', { items });
// });

// GET /items/:id/prices/new
// Example of a protected route
// router.get('items/:id/prices/new', (req, res) => {
//   res.render('items/new.ejs');
// });

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

// router.get('/:id', ensureLoggedIn, async (req, res) => {
//   const item = await Item.findById(req.params.id).populate('user');
//   res.render('items/show.ejs', { item })
// });

// router.delete('/:id', ensureLoggedIn, async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (item.user.equals(req.user._id)) {
//       await item.deleteOne();
//       res.redirect('/items');
//     } else {
//       res.send("You are not permitted to delete this item");
//     }
//   } catch (err) {
//     console.log(err);
//     res.redirect('/');
//   } 
// });

// router.get('/:id/edit', ensureLoggedIn, async (req, res) => {
//   try {
//     const currentItem = await Item.findById(req.params.id);
//     res.render('items/edit.ejs', {
//       item: currentItem,
//     }); 
//   } catch (err) {
//     console.log(err);
//     res.redirect('/');
//   }
// });

// router.get('/:id', ensureLoggedIn, async (req, res) => {

// });

// router.put('/:id', ensureLoggedIn, async (req, res) => {
//   try {
//     const currentItem = await Item.findById(req.params.id);
//     if (currentItem.user.equals(req.user._id)) {
//       await currentItem.updateOne(req.body);
//       res.redirect('/items');
//     } else {
//       res.send("Denied");
//       }
//     } catch (err) {
//       console.log(err);
//       res.redirect('/');
//   }
// });

module.exports = router;