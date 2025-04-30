const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Product schema
const productSchema = new Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  discount: { type: Number, default: 0 }, // Default is 0 if no discount
  campaign_id: { type: String, required: false }, // Optional
  imageUrl: { type: String, required: false }, // Path for the image file
  added_date: { type: Date, default: Date.now }, // Automatically set when added
  last_updated_date: { type: Date, default: Date.now }, // Automatically set when updated
});

// Update last_updated_date before saving any update
productSchema.pre('save', function (next) {
  this.last_updated_date = Date.now();
  next();
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;



/// --- Old 2
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the Product schema
// const productSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   count: {
//     type: Number,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   imageUrl: {
//     type: String,  // Stores the path of the uploaded image
//     required: true
//   }
// });

// // Create the Product model
// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;





/// Old -----------------------------------------

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the Product schema
// const productSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   count: {
//     type: Number,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   }
// });

// // Create the Product model
// const Product = mongoose.model('Product', productSchema);

// // Export the Product model
// module.exports = Product;

/// ------------------------------------------------------------