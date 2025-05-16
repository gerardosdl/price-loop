const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  price: {
    type: number,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: user,
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

module.exports = mongoose.model("Price", priceSchema);
