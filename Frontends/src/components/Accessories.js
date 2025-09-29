import React from 'react';
import ProductList from './ProductList';

const Accessories = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Accessories</h2>
      <ProductList categoryFilter="Accessories" showImages={true} />
    </div>
  );
};

export default Accessories;
