import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FloatingSpices from '../components/FloatingSpices';
import Hero from '../components/Hero';
import TrustBanner from '../components/TrustBanner';
import AuthenticityBanner from '../components/AuthenticityBanner';
import OrderForm from '../components/OrderForm';
import CartDrawer from '../components/CartDrawer';
import StorySection from '../components/StorySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { getProducts } from '../services/api';
import { Sparkles, ArrowRight, ShoppingCart, X } from 'lucide-react';

function Home({ navigate }) {
  const [products, setProducts] = useState([]);
  
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mirchi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('mirchi_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    }
    loadProducts();
  }, []);

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    const firstCartItem = cartItems[0];
    const matchingProduct = firstCartItem 
      ? products.find(p => p.id === firstCartItem.id) || { name: firstCartItem.name, price: firstCartItem.price }
      : products[0] || { name: 'Masala Karam', price: 300 };

    setActiveCheckoutProduct(matchingProduct);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Background Floating Particles Layer */}
      <FloatingSpices />

      {/* Header Navigation with Live Cart Count */}
      <Navbar 
        navigate={navigate} 
        cartCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        currentPath="/"
      />

      {/* Toast Banner when item added */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-gray-900 text-white border border-amber-500/40 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in max-w-sm">
          <div className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
            ✓
          </div>
          <div className="flex-1 text-xs">
            <span className="font-bold text-amber-400 block">{toastMessage}</span>
            <span className="text-[10px] text-gray-300">Ready to complete your order.</span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-amber-500 text-gray-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full hover:bg-amber-400 transition-colors"
          >
            Cart
          </button>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Light White Accessibility Banner Hero (No Products Grid below) */}
      <Hero navigate={navigate} />

      {/* Trust Badges */}
      <TrustBanner />

      {/* Organic Disclaimer Stitch Box */}
      <AuthenticityBanner />

      {/* ── Shop Teaser CTA Banner (Directs to /products) ── */}
      <section className="py-12 sm:py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-800 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            <Sparkles size={14} className="text-amber-600 flex-shrink-0" /> Single-Estate Heritage Collection
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-gray-900 tracking-tight">
            Discover Our 6 Artisan Spice Recipes
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto font-normal px-2">
            Masala Karam, Goddu Karam, Kandi Podi, Nalla Karam, Kobbari Karam, and Peanut Chutney Powder — cold stone-pounded in micro artisan batches.
          </p>
          <div>
            <button
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto bg-red-800 hover:bg-red-900 text-white font-extrabold py-3.5 sm:py-4 px-8 sm:px-10 rounded-full text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <span>Explore Full Spice Shop</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Our Craft Story Section (The Heart of Our Website) ── */}
      <StorySection />

      {/* ── Contact Section ── */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Cart Drawer Slide-over */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Purchase Checkout Form Drawer */}
      {activeCheckoutProduct && (
        <OrderForm
          selectedProduct={activeCheckoutProduct}
          onClose={() => setActiveCheckoutProduct(null)}
        />
      )}

      {/* WhatsApp Floating CTA */}
      <WhatsAppButton />

    </div>
  );
}

export default Home;
