const Product = require('../models/productModel');

const multer=require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, 'uploads');
    } else {
      console.log('Invalid file type:', file.mimetype);
      cb(new Error('Invalid file type.'), null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


 



async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    
    const productsWithImages = products.map(product => ({
      ...product._doc,
      // image: product.image
      image: `http://localhost:3000/${product.image}`
    }));
    res.json(productsWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  try {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      //const imageUrl = req.file ? req.file.path : '';
      let imageUrl = '';
      if (req.file) {
        // Remove the root directory from the file path
        imageUrl = req.file.path.replace(req.file.destination + '/', '');
      }
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: imageUrl,
        price: req.body.price
      });

      const newProduct = await product.save();
      res.status(201).json(newProduct);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const product = await Product.findById(productId);


    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   
    product.name = updatedData.productname;
    product.description = updatedData.description;
    product.image = updatedData.image;
    product.price = updatedData.price;
    

    
    await product.save();

    
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
    
module.exports = {
 
  getAllProducts,
  getProductById,
  
  updateProduct,
  deleteProduct,
 createProduct

  
  
};
