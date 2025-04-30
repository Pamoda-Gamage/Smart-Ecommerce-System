import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8070/product/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Delete a product by ID
  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8070/product/delete/${id}`);
        alert('Product deleted successfully!');
        // Refresh the product list after deletion
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-darkBlue">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-darkBlue text-white">
            <tr>
              <th className="py-2 px-4">Product ID</th> {/* New Product ID column */}
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Price (Rs)</th>
              <th className="py-2 px-4">Stock Quantity</th>
              <th className="py-2 px-4">Brand</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Discount (%)</th>
              <th className="py-2 px-4">Weight (g)</th>
              <th className="py-2 px-4">Campaign</th>
              <th className="py-2 px-4">Added Date</th>
              <th className="py-2 px-4">Last Updated</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-2 px-4">{product._id}</td> {/* Display Product ID */}
                  <td className="py-2 px-4">
                    <img
                      src={`http://localhost:8070/${product.imageUrl}`} // Image URL
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4">{product.title || 'N/A'}</td>
                  <td className="py-2 px-4">Rs.{product.price}</td>
                  <td className="py-2 px-4">{product.count}</td>
                  <td className="py-2 px-4">{product.brand || 'N/A'}</td>
                  <td className="py-2 px-4">{product.category || 'N/A'}</td>
                  <td className="py-2 px-4">{product.discount}%</td>
                  <td className="py-2 px-4">{product.weight}g</td>
                  <td className="py-2 px-4">{product.campaign_id || 'N/A'}</td>
                  <td className="py-2 px-4">{new Date(product.added_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{new Date(product.last_updated_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition duration-300"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center py-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
