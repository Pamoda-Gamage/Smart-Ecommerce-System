import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
  const [productId, setProductId] = useState(''); // ID of the product to update
  const [product, setProduct] = useState({
    title: '',
    weight: '',
    count: '',
    price: '',
    description: '',
    brand: '',
    category: '',
    discount: '',
    campaign_id: ''
  });
  const [image, setImage] = useState(null); // State for image file
  const [message, setMessage] = useState(''); // To display success or error messages
  const [errors, setErrors] = useState({}); // To store validation errors

  // Fetch product details by ID
  const fetchProductById = async (e) => {
    e.preventDefault();
    if (!productId) {
      setMessage('Please enter a Product ID');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8070/product/get/${productId}`);
      setProduct(response.data); // Populate the form with the product data
      setMessage('');
    } catch (err) {
      console.error('Error fetching product:', err);
      setMessage('Product not found');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image
  };

  // Validate the form inputs
  const validate = () => {
    let validationErrors = {};

    if (!product.title) validationErrors.title = 'Title is required';
    if (!product.weight || isNaN(product.weight) || product.weight <= 0) {
      validationErrors.weight = 'Weight must be a positive number greater than 0';
    }
    if (!product.count || isNaN(product.count) || product.count <= 0 || !Number.isInteger(Number(product.count))) {
      validationErrors.count = 'Count must be a positive integer greater than 0';
    }
    if (!product.price || isNaN(product.price) || product.price <= 0) {
      validationErrors.price = 'Price must be a positive number greater than 0';
    }
    if (!product.description) validationErrors.description = 'Description is required';
    if (!product.brand) validationErrors.brand = 'Brand is required';
    if (!product.category) validationErrors.category = 'Category is required';
    if (isNaN(product.discount) || product.discount < 0) {
      validationErrors.discount = 'Discount cannot be negative';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // If validation fails, don't submit

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('weight', product.weight);
    formData.append('count', product.count);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('brand', product.brand);
    formData.append('category', product.category);
    formData.append('discount', product.discount);
    formData.append('campaign_id', product.campaign_id);
    if (image) {
      formData.append('image', image); // Only append the image if it has been selected
    }

    try {
      await axios.put(`http://localhost:8070/product/update/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Product updated successfully!');
      setErrors({});
    } catch (err) {
      console.error('Error updating product:', err);
      setMessage('Error updating product');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-darkBlue">Update Product</h2>

      {/* Form to fetch product by ID */}
      <form onSubmit={fetchProductById} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="productId" className="block text-darkBlue font-semibold">Product ID</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-darkBlue"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-darkBlue text-white py-2 mt-4 rounded-lg hover:bg-blue-light transition duration-300">
          Fetch Product
        </button>
      </form>

      {/* Form to update product details */}
      {product && (
        <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Title Field */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-darkBlue font-semibold">Title</label>
            <input
              type="text"
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Weight Field */}
          <div className="mb-6">
            <label htmlFor="weight" className="block text-darkBlue font-semibold">Weight</label>
            <input
              type="number"
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.weight ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="weight"
              name="weight"
              value={product.weight}
              onChange={handleChange}
            />
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
          </div>

          {/* Count Field */}
          <div className="mb-6">
            <label htmlFor="count" className="block text-darkBlue font-semibold">Count</label>
            <input
              type="number"
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.count ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="count"
              name="count"
              value={product.count}
              onChange={handleChange}
            />
            {errors.count && <p className="text-red-500 text-sm mt-1">{errors.count}</p>}
          </div>

          {/* Price Field */}
          <div className="mb-6">
            <label htmlFor="price" className="block text-darkBlue font-semibold">Price</label>
            <input
              type="number"
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-darkBlue font-semibold">Description</label>
            <textarea
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="description"
              name="description"
              rows="3"
              value={product.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Brand Field */}
          <div className="mb-6">
            <label htmlFor="brand" className="block text-darkBlue font-semibold">Brand</label>
            <input
              type="text"
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.brand ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
            />
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
          </div>

          {/* Category Field */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-darkBlue font-semibold">Category</label>
            <input
              type="text"
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Discount Field */}
          <div className="mb-6">
            <label htmlFor="discount" className="block text-darkBlue font-semibold">Discount</label>
            <input
              type="number"
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.discount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="discount"
              name="discount"
              value={product.discount}
              onChange={handleChange}
            />
            {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
          </div>

          {/* Campaign ID Field */}
          <div className="mb-6">
            <label htmlFor="campaign_id" className="block text-darkBlue font-semibold">Campaign ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg border-gray-300"
              id="campaign_id"
              name="campaign_id"
              value={product.campaign_id}
              onChange={handleChange}
            />
          </div>

          {/* Image Field */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-darkBlue font-semibold">Product Image (Optional)</label>
            <input
              type="file"
              className="w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg border-gray-300"
              id="image"
              onChange={handleImageChange}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-darkBlue text-white py-2 mt-4 rounded-lg hover:bg-blue-light transition duration-300"
          >
            Update Product
          </button>
        </form>
      )}

      {/* Display success or error message */}
      {message && (
        <div className={`mt-6 text-center text-lg ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
