const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price:{
    type:Number,
    required:true 
 },
 status:{
    type:String,
    required:true,
    default:'pending',
},
createdAt:{
    type:Date,
    default:Date.now,
},
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
