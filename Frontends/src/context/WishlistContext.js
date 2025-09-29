import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (item) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((i) => i.id === item.id)) {
        return prevItems; // already in wishlist
      }
      return [...prevItems, item];
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (item) => {
    if (wishlistItems.find((i) => i.id === item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
