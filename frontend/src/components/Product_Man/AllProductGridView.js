import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProductGridView = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // To store the search input
  const [filteredProducts, setFilteredProducts] = useState([]); // To store the filtered products

  // Fetch all products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8070/product/');
      setProducts(response.data);
      setFilteredProducts(response.data); // Initially, show all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to handle search on button click
  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-darkBlue">Product View</h2>

      {/* Search Bar with Button */}
      <div className="flex justify-center items-center mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search products by title..."
          className="w-full px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-darkBlue"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-darkBlue text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={`http://localhost:8070/${product.imageUrl}`} // Make sure imageUrl is correct in your backend
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-500 mb-2">Rs.{product.price}</p>
              <p className="text-gray-400 mb-4">{product.category}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products found</p>
        )}
      </div>
    </div>
  );
};

export default AllProductGridView;
