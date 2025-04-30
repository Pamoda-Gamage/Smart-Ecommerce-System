import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Product Manager
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="./" className="text-white hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link to="./add-product" className="text-white hover:text-gray-300 transition duration-300">
            Add Product
          </Link>
          <Link to="./product-table" className="text-white hover:text-gray-300 transition duration-300">
            Product List
          </Link>
          <Link to="./product-update" className="text-white hover:text-gray-300 transition duration-300">
            Product Update
          </Link>
          <Link to="./product-report" className="text-white hover:text-gray-300 transition duration-300">
            Product Report
          </Link>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none" id="menu-btn">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
