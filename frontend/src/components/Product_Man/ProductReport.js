import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const ProductReport = () => {
  const [products, setProducts] = useState([]);

  // Colors for pie chart slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8070/product/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Group products by category for pie chart data
  const getPieChartData = () => {
    const categoryCount = {};
    products.forEach((product) => {
      if (categoryCount[product.category]) {
        categoryCount[product.category] += 1;
      } else {
        categoryCount[product.category] = 1;
      }
    });
    return Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  };

  // Group products by added date for bar chart data
  const getBarChartData = () => {
    const dateCount = {};
    products.forEach((product) => {
      const addedDate = new Date(product.added_date).toLocaleDateString();
      if (dateCount[addedDate]) {
        dateCount[addedDate] += 1;
      } else {
        dateCount[addedDate] = 1;
      }
    });
    return Object.entries(dateCount).map(([date, count]) => ({ date, count }));
  };

  // Sort products by last updated date
  const sortedProducts = products.slice().sort((a, b) => new Date(b.last_updated_date) - new Date(a.last_updated_date));

  // Handle download report as PDF (portrait orientation, regular PDF report)
  const handleDownloadReport = () => {
    const doc = new jsPDF(); // Regular portrait orientation

    // Add the table data in PDF using jsPDF Autotable
    doc.text('Product Report', 20, 10);

    doc.autoTable({
      startY: 20,
      head: [
        ['Added Date', 'Last Updated', 'Title', 'Brand', 'Price', 'Count', 'Weight', 'Category', 'Campaign ID', 'Discount', 'Description'],
      ],
      body: sortedProducts.map((product) => [
        new Date(product.added_date).toLocaleDateString(), // Added Date
        new Date(product.last_updated_date).toLocaleDateString(), // Last Updated Date
        product.title || 'N/A', // Title
        product.brand || 'N/A', // Brand
        `Rs.${product.price}`, // Price
        product.count, // Count
        `${product.weight}g`, // Weight
        product.category || 'N/A', // Category
        product.campaign_id || 'N/A', // Campaign ID
        `${product.discount}%`, // Discount
        product.description || 'N/A', // Description
      ]),
      theme: 'grid', // Use a simple grid for the table
      headStyles: { fillColor: [0, 123, 255] }, // Styling for the table head
    });

    doc.save('product_report.pdf');
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-darkBlue">Product Report</h2>

      {/* Button to Download Report */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleDownloadReport}
        >
          Download Report
        </button>
      </div>

      {/* Pie Chart by Categories */}
      <div className="w-full bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-lg font-semibold mb-4 text-center">Product Categories Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={getPieChartData()}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {getPieChartData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart by Added Dates */}
      <div className="w-full bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-lg font-semibold mb-4 text-center">Products Added by Date</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getBarChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Table Displayed on Screen */}
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">Product Table</h3>
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-darkBlue text-white">
            <tr>
              <th className="py-2 px-4">Added Date</th>
              <th className="py-2 px-4">Last Updated</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Brand</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Count</th>
              <th className="py-2 px-4">Weight</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Campaign ID</th>
              <th className="py-2 px-4">Discount</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-2 px-4">{new Date(product.added_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{new Date(product.last_updated_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{product.title || 'N/A'}</td>
                  <td className="py-2 px-4">{product.brand || 'N/A'}</td>
                  <td className="py-2 px-4">Rs.{product.price}</td>
                  <td className="py-2 px-4">{product.count}</td>
                  <td className="py-2 px-4">{product.weight}g</td>
                  <td className="py-2 px-4">{product.category || 'N/A'}</td>
                  <td className="py-2 px-4">{product.campaign_id || 'N/A'}</td>
                  <td className="py-2 px-4">{product.discount}%</td>
                  <td className="py-2 px-4">{product.description || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-4">
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

export default ProductReport;
