import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import ProductView from './AllProductGridView';
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';
import ProductReport from './ProductReport';
import UpdateProduct from './UpdateProduct';

const ProductManageConsole = () => {
  return (
    <div>
      <NavBar /> {/* The Navbar remains within the Product Management console */}
      <Routes>
        <Route path="/" element={<ProductView />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-table" element={<ProductTable />} />
        <Route path="/product-report" element={<ProductReport />} />
        <Route path="/product-update" element={<UpdateProduct/>} />
      </Routes>
    </div>
  );
};

export default ProductManageConsole;
