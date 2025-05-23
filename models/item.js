const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  store: {
    type: String,
    required: true,
  }, 
  note: {
    type: String,
    required: true,
  },
  
}, {
  timestamps: true
});



const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  prices: {
    type: [priceSchema],
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trackedBy: {
    type:[Schema.Types.ObjectId],
    ref: 'User',
    required: false,
  },
  location:{
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Item", itemSchema);
