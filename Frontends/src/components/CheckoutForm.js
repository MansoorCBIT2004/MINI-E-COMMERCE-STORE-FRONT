import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const CheckoutForm = () => {
  const { cartItems, clearCart, backendUrl } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const items = cartItems.map(item => ({ product: item.id, quantity: item.quantity }));

    console.log('Submitting order:', { userId: null, items, totalAmount });

    try {
      const response = await axios.post(`${backendUrl}/api/checkout`, {
        userId: null,
        items,
        totalAmount,
      });
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3); // Assuming 3 days delivery
      const formattedDate = deliveryDate.toLocaleDateString();
      setOrderStatus(`Order placed successfully! Expected delivery on ${formattedDate}`);
      clearCart();
      setFormData({ name: '', email: '', address: '' });
    } catch (error) {
      console.error('Order placement error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
      setOrderStatus(errorMessage);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      {orderStatus && (
        <p className="mb-4 text-blue-600 font-bold text-lg">
          {orderStatus.includes('delivered on') ? (
            <>
              {orderStatus.split('delivered on ')[0]}delivered on <span className="text-red-600">{orderStatus.split('delivered on ')[1]}</span>
            </>
          ) : (
            orderStatus
          )}
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;


