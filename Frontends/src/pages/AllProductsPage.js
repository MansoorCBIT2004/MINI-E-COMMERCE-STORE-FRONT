import React from 'react';
import AllProductsImagesNavbar from '../components/AllProductsImagesNavbar';

const AllProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <AllProductsImagesNavbar />
    </div>
  );
};

export default AllProductsPage;
