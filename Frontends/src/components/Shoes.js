import React from 'react';
import ProductList from './ProductList';

const Shoes = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shoes</h2>
      <ProductList categoryFilter="Shoes" showImages={true} />
    </div>
  );
};

export default Shoes;
