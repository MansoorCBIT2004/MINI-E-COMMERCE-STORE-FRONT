import React, { useState } from 'react';
import { womenProducts } from '../productsData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart } from 'react-icons/fa';

const WomenNavbar = () => {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [notification, setNotification] = useState('');

  const handleAddToCart = (product) => {
    addItem({ id: product.id, name: product.name, price: product.price });
    setNotification(`${product.name} is added to cart`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
    }
  };

  return (
    <div>
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {notification}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Women's Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {womenProducts.filter(p => !p.name.toLowerCase().includes('kids')).map((product) => (
          <div key={product.id} className="bg-white rounded shadow transition-all duration-300 flex flex-col relative">
            <div className="relative w-full bg-white rounded mx-auto mb-2 overflow-hidden transition-all duration-300">
              <img src={product.imageUrl} alt={product.name} className="w-full h-80 object-contain rounded hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="self-end p-1">
              <button
                onClick={() => handleWishlistToggle(product)}
                className="bg-white rounded-full p-1 shadow-md"
              >
                <FaHeart size={20} className={isInWishlist(product.id) ? 'fill-current text-red-500' : 'text-gray-400'} />
              </button>
            </div>
            <div className="p-2 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-bold text-lg text-center mb-1">{product.name}</h3>
                <p className="font-semibold text-center text-blue-600 text-sm">${product.price.toFixed(2)}</p>
                <p className="text-xs text-center text-gray-500 mb-2">Stock: {product.stock}</p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenNavbar;
