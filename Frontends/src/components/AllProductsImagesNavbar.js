import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart } from 'react-icons/fa';

const AllProductsImagesNavbar = () => {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [allProducts, setAllProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        const response = await axios.get('/api/products', { params });
        console.log('Fetch successful. Response data:', response.data);
        console.log('Products with imageUrls:', response.data.map(p => ({ id: p.id, name: p.name, imageUrl: p.imageUrl })));
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error details:', error.response || error.message);
        setAllProducts([]); // Set empty array on error
      }
    };

    fetchProducts();
  }, [search, category]);

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
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {allProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products found for the selected category.</p>
        ) : (
          allProducts.map((product) => (
            <div key={product._id} className="bg-white rounded shadow transition-all duration-300 flex flex-col relative">
              <div className="relative w-full bg-white rounded mx-auto mb-2 overflow-hidden transition-all duration-300">
                <img 
                  src={product.imageUrl || 'https://via.placeholder.com/300'} 
                  alt={product.name} 
                  className="w-full h-64 object-contain rounded hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error(`Failed to load image for product ID ${product._id} with URL: ${e.target.src}`);
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                  onLoad={() => console.log(`Successfully loaded image for product ID ${product._id}`)}
                />
              </div>
              <div className="self-end p-1">
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className="bg-white rounded-full p-1 shadow-md"
                >
                  <FaHeart size={20} className={isInWishlist(product._id) ? 'fill-current text-red-500' : 'text-gray-400'} />
                </button>
              </div>
              <div className="p-2 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-lg text-center mb-1">{product.name}</h3>
                  <p className="font-semibold text-center text-blue-600 text-sm">${product.price.toFixed(2)}</p>
                  <p className="text-xs text-center text-gray-500 mb-2">Stock: {product.stock || 0}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProductsImagesNavbar;
