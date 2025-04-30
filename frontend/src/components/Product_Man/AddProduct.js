import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
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
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [message, setMessage] = useState(''); // To show success/error message
  const [errors, setErrors] = useState({}); // To store validation errors

  // Handle input changes for form fields
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // Handle image file change and set preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the selected image
    setImagePreview(URL.createObjectURL(file)); // Create a preview URL
  };

  // Frontend validations
  const validate = () => {
    let errors = {};

    // Title validation
    if (!product.title) errors.title = 'Title is required';

    // Weight validation
    if (!product.weight || isNaN(product.weight) || product.weight <= 0) {
      errors.weight = 'Weight must be a positive number greater than 0';
    }

    // Count validation (must be an integer and greater than 0)
    if (!product.count || isNaN(product.count) || product.count <= 0 || !Number.isInteger(Number(product.count))) {
      errors.count = 'Count must be a positive integer greater than 0';
    }

    // Price validation
    if (!product.price || isNaN(product.price) || product.price <= 0) {
      errors.price = 'Price must be a positive number greater than 0';
    }

    // Description validation
    if (!product.description) errors.description = 'Description is required';

    // Brand validation
    if (!product.brand) errors.brand = 'Brand is required';

    // Category validation
    if (!product.category) errors.category = 'Category is required';

    // Discount validation (can be 0 but not negative)
    if (isNaN(product.discount) || product.discount < 0) {
      errors.discount = 'Discount cannot be negative';
    }

    // Image validation
    if (!image) errors.image = 'Image is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // If validation fails, don't submit

    // Create FormData to send the product data and image file
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
    formData.append('image', image); // Add image file to the form data

    try {
      await axios.post('http://localhost:8070/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Product added successfully!');
      // Reset form after submission
      setProduct({
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
      setImage(null); // Reset image input
      setImagePreview(null); // Reset image preview
      setErrors({}); // Clear any validation errors
    } catch (err) {
      console.error('Error adding product:', err);
      setMessage('Error adding product');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-darkBlue">Add Product</h2>
      <div className="flex justify-between items-start">
        {/* Form Section */}
        <form 
          onSubmit={handleSubmit} 
          className="w-2/3 bg-white p-8 rounded-lg shadow-md border border-gray-200"
        >
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
              rows="4"
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
              className="w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg border-gray-300"
              id="discount"
              name="discount"
              value={product.discount}
              onChange={handleChange}
            />
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
            <label htmlFor="image" className="block text-darkBlue font-semibold">Product Image</label>
            <input
              type="file"
              className={`w-full px-4 py-2 mt-2 border focus:ring-2 focus:ring-darkBlue rounded-lg ${
                errors.image ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              id="image"
              onChange={handleImageChange}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-darkBlue text-white py-2 mt-4 rounded-lg hover:bg-blue-light transition duration-300"
          >
            Add Product
          </button>
        </form>

        {/* Image Preview Section */}
        {imagePreview && (
          <div className="w-1/3 ml-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Image Preview</h3>
            <img
              src={imagePreview}
              alt="Selected product"
              className="w-full h-auto object-cover rounded-lg border"
            />
          </div>
        )}
      </div>

      {/* Display success or error message */}
      {message && (
        <div className={`mt-6 text-center text-lg ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
