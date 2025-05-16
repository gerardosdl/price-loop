const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  prices: {
    type: [priceSchema],
    required: true,
  },
  user: {
    type: ObjectId,
    ref: user,
    required: true,
  },
  trackedBy: {
    type:[ObjectId],
    ref: user,
    required: true,
  },
  location:{
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Item", itemSchema);
