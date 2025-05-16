const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  // prices: {
  //   type: [priceSchema],
  //   required: true,
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trackedBy: {
    type:[Schema.Types.ObjectId],
    ref: 'User',
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
