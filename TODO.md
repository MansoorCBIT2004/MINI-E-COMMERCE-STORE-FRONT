# Task: Refactor AllProductsImagesNavbar to Display Full Product Cards

## Steps to Complete:

1. [ ] Edit frontend/src/components/AllProductsImagesNavbar.js:
   - Add necessary imports for contexts and FaHeart.
   - Add notification state and handlers for cart and wishlist.
   - Update component to render a heading, notification, and grid of full product cards with large images, details, and buttons (matching category navbars).
   - Remove unused imports and small thumbnail logic.

2. [ ] Restart frontend server (`cd frontend && npm start`) to apply changes.

3. [ ] Test in browser:
   - Navigate to http://localhost:3000/products.
   - Verify grid displays 30 full cards with large images (h-64, object-contain, hover scale).
   - Test Add to Cart: Button works, shows green notification.
   - Test Wishlist: Heart toggles (gray to red), integrates with context.
   - Confirm no console errors; images load successfully.
   - Check responsiveness (mobile: 2 cols, desktop: 4 cols).

4. [ ] Update TODO.md to mark steps as completed.

5. [ ] If issues, debug and iterate (e.g., check contexts, API fetch).
