
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  uploaded:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Product', productSchema);
