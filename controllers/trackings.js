const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
router.use(ensureLoggedIn);

// ALL paths start with '/items'

// index action
// GET /items
// router.get('/trackings', async (req, res) => {
//   const items = await Item.find({ trackedBy: req.user._id }).sort('-createdAt');
//   res.render('items/index.ejs', { items, title: 'My Tracked Items'  });
// });

router.get('/trackings', async (req, res) => {
  const category = req.query.category || '';
  const query = { trackedBy: req.user._id };
  if (category) query.category = category;
  const sort = req.query.sort || 'name';
  const items = await Item.find(query).sort(sort);
  const categories = await Item.distinct('category', { trackedBy: req.user._id });
  res.render('items/index.ejs', { items, category, sort, title: 'My Tracked Items', categories });
});




// GET /items/new
// Example of a protected route
// router.get('/new', ensureLoggedIn, (req, res) => {
//   res.render('items/new.ejs');
// });

router.post('/items/:id/trackings', async (req, res) => {
  await Item.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { trackedBy: req.user._id } }
  );
  res.redirect(`/items/${req.params.id}`)
});

router.delete('/items/:id/trackings', async (req, res) => {
  await Item.findByIdAndUpdate(
    req.params.id,
    { $pull: { trackedBy: req.user._id } }
  );
  res.redirect(`/items/${req.params.id}`)
  });

// router.get('/:id', ensureLoggedIn, async (req, res) => {
//   const item = await Item.findById(req.params.id)
//   .populate('user')
//   .populate('prices.user')
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