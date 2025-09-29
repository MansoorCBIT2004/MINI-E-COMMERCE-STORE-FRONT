import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart } from 'react-icons/fa';

const ProductList = ({ categoryFilter, productNamesFilter, showImages = false }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryFilter || '');
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        const response = await axios.get('/api/products', { params });
        let filteredProducts = response.data;
        if (productNamesFilter && productNamesFilter.length > 0) {
          filteredProducts = filteredProducts.filter(p => productNamesFilter.includes(p.name));
        }
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [search, category, productNamesFilter]);

  const handleAddToCart = (product) => {
    addItem({ id: product._id, name: product.name, price: product.price });
    setNotification(`${product.name} is added to cart`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({ id: product._id, name: product.name, price: product.price, imageUrl: product.imageUrl });
    }
  };

  return (
    <div>
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {notification}
        </div>
      )}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Clothes">Clothes</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products found for the selected category.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow hover:shadow-xl hover:scale-105 transition-all duration-300 relative group">
              {showImages && (
                <div className="relative mb-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-48 h-48 object-cover rounded border-2 border-yellow-500 mx-auto block"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  >
                    <FaHeart size={20} className={isInWishlist(product._id) ? 'fill-current text-red-500' : 'text-gray-400'} />
                  </button>
                </div>
              )}
              <h3 className="font-bold text-lg text-center mb-2">{product.name}</h3>
              <p className="mt-1 font-semibold text-center text-blue-600">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
