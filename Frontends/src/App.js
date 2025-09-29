import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import Home from './components/Home';
import MensNavbar from './components/MensNavbar';
import WomenNavbar from './components/WomenNavbar';
import KidsNavbar from './components/KidsNavbar';
import CartPage from './pages/CartPage';
import AllProductsPage from './pages/AllProductsPage';

function AppContent() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const category = urlParams.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('');
    }
  }, [location.search]);

  const renderCategoryComponent = () => {
    switch (selectedCategory) {
      case 'Mens':
        return <MensNavbar />;
      case 'Women':
        return <WomenNavbar />;
      case 'Kids':
        return <KidsNavbar />;
      default:
        return <Home onCategorySelect={setSelectedCategory} />;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
            />
          </svg>
          <h1 className="text-2xl font-bold">SOMANA MART</h1>
        </div>
        <nav className="space-x-4 flex items-center">
          <button
            onClick={() => navigate('/')}
            className={`px-4 py-2 rounded flex items-center ${
              selectedCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </button>
          <button
            onClick={() => navigate('/?category=Mens')}
            className={`px-4 py-2 rounded flex items-center ${
              selectedCategory === 'Mens' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Mens
          </button>
          <button
            onClick={() => navigate('/?category=Women')}
            className={`px-4 py-2 rounded flex items-center ${
              selectedCategory === 'Women' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Women
          </button>
          <button
            onClick={() => navigate('/?category=Kids')}
            className={`px-4 py-2 rounded flex items-center ${
              selectedCategory === 'Kids' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Kids
          </button>
          <button
            onClick={() => navigate('/products')}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 flex items-center space-x-2"
          >
            <span>All Products</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
              />
            </svg>
          </button>
          <div className="relative">
            <button
              onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
                />
              </svg>
              <span>Cart ({cartItems.length})</span>
            </button>
            {isCartDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-10">
                {cartItems.length === 0 ? (
                  <p className="p-4">Your cart is empty.</p>
                ) : (
                  <>
                    <ul className="p-4 max-h-48 overflow-y-auto">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between mb-2">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t p-4 font-bold">
                      Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </div>
              <button
                onClick={() => { setIsCartDropdownOpen(false); navigate('/cart'); }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Go to Cart
              </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="p-4 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-3">
          <Routes>
            <Route path="/" element={renderCategoryComponent()} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/products" element={<AllProductsPage />} />
          </Routes>
        </section>
        <aside>
          {isCartOpen && <Cart />}
          {/* Removed CheckoutForm from cart toggle */}
          {/* <CheckoutForm /> */}
        </aside>
      </main>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
