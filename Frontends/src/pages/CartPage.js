import React from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-yellow-400 p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
