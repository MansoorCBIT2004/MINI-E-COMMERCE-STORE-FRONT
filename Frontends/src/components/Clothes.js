import React from 'react';
import ProductList from './ProductList';

const Clothes = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clothes</h2>
      <ProductList categoryFilter="Clothes" showImages={true} />
    </div>
  );
};

export default Clothes;
