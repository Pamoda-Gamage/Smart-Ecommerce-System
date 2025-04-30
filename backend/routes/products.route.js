
let Product = require("../models/Product");
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
  }
});

const upload = multer({ storage: storage });


/////////////////////////////////////////////////
// Route to add a new product with an image

router.post('/add', upload.single('image'), async (req, res) => {
  const { title, weight, count, price, description, brand, category, discount, campaign_id } = req.body;
  const imageUrl = req.file ? req.file.path : '';

  const newProduct = new Product({
    title,
    weight,
    count,
    price,
    description,
    brand,
    category,
    discount,
    campaign_id,
    imageUrl,
  });

  try {
    await newProduct.save();
    res.status(201).json('Product added successfully!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/').get(async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products); // Return all products including the imageUrl field
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

/////////////////////////////////////////////////
// Updating a product
router.put('/update/:id', upload.single('image'), async (req, res) => {
  const { title, weight, count, price, description, brand, category, discount, campaign_id } = req.body;
  const imageUrl = req.file ? req.file.path : undefined;
//update validation
  try {
    const updatedProduct = await Product.findById(req.params.id);
    if (!updatedProduct) return res.status(404).json('Product not found');

    // Update fields
    updatedProduct.title = title;
    updatedProduct.weight = weight;
    updatedProduct.count = count;
    updatedProduct.price = price;
    updatedProduct.description = description;
    updatedProduct.brand = brand;
    updatedProduct.category = category;
    updatedProduct.discount = discount;
    updatedProduct.campaign_id = campaign_id;
    if (imageUrl) updatedProduct.imageUrl = imageUrl;

    await updatedProduct.save();
    res.status(200).json('Product updated successfully');
  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});


// Delete Product
router.route("/delete/:id").delete(async (req, res) => {
  //delete validation
  let productId = req.params.id; // Get the product ID from the request parameters

  try {
    await Product.findByIdAndDelete(productId); // Delete the product by ID
    res.status(200).send({ status: "Product deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with deleting product", error: err.message });
  }
});


router.get('/get/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    //product validation
    if (!product) return res.status(404).json('Product not found');
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});


// Route to add multiple products
router.post('/add-multiple', async (req, res) => {
  try {
    const products = req.body; // Expecting an array of products
    //add validation
    if (!Array.isArray(products)) {
      return res.status(400).json({ message: 'Expected an array of products' });
    }

    const insertedProducts = await Product.insertMany(products); // Mongoose batch insertion
    res.status(201).json(insertedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting products', error });
  }
});

module.exports = router;