const Order = require('../models/orderModel');


const createOrder = async (req, res) => {
  try {
   
    const { user, product, quantity ,price,status,createdAt} = req.body;

    const order = new Order({
      user,
      product,
      quantity,
      price,
      status,
      createdAt
    });

    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getOrders = async (req, res) => {
    try {
      
      const orders = await Order.find().populate('user').populate('product');
    
      res.status(200).json({ orders });
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {
  createOrder,
  getOrders,

};
