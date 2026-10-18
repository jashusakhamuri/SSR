
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StorySection from '../components/StorySection';
import CartDrawer from '../components/CartDrawer';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { ArrowRight } from 'lucide-react';

const SERIF = "'Fraunces', 'Noto Serif Telugu', Georgia, serif";

const GALLERY = [
  { img: '/images/story_harvest.jpg', title: 'Guntur farm harvest', span: 'lg:col-span-2 lg:row-span-2' },
  { img: '/images/story_drying.jpg', title: 'Village sun-drying', span: '' },
  { img: '/images/story_pounding.jpg', title: 'Granite mortar grind', span: '' },
  { img: '/images/story_packaging.jpg', title: 'Sealed glass jar', span: 'lg:col-span-2' },
];

function StoryPage({ navigate }) {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mirchi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('mirchi_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const handleUpdateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      newQty <= 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };
  const handleRemoveItem = (id) => setCartItems((prev) => prev.filter((item) => item.id !== id));
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveCheckoutProduct({ name: 'Masala Karam', price: 300 });
  };
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen" style={{ background: '#1a1512' }}>
      <Navbar
        navigate={navigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentPath="/story"
      />

      {/* Hero */}
      <header className="pt-40 pb-8 px-6 lg:px-12" style={{ color: '#efe9df' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold mb-5" style={{ color: '#e3a72f' }}>Our story</p>
          <h1
            className="text-5xl sm:text-7xl leading-[1.02] tracking-tight max-w-4xl"
            style={{ fontFamily: SERIF, fontWeight: 600 }}
          >
            Real Guntur chilli powder can’t be made in a factory.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: '#9a9187' }}>
            Every batch follows the same village process: hand harvest, sun-drying, stone pounding and glass sealing.
          </p>
        </div>
      </header>

      <StorySection />

      {/* Gallery */}
      <section className="py-24 px-6 lg:px-12" style={{ background: '#241d18' }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-5xl max-w-2xl leading-tight"
            style={{ fontFamily: SERIF, fontWeight: 600, color: '#efe9df' }}
          >
            Photographed in Guntur courtyards
          </h2>
          <p className="mt-3 mb-12 max-w-lg" style={{ color: '#9a9187' }}>
            From our partner farms and stone-grinding workshops.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px] gap-4">
            {GALLERY.map((g) => (
              <figure
                key={g.title}
                className={`group relative rounded-3xl overflow-hidden min-h-[220px] ${g.span}`}
                style={{ background: '#1a1512' }}
              >
                <img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-5 right-5 text-lg text-white" style={{ fontFamily: SERIF, fontWeight: 600 }}>
                  {g.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 px-6 text-center" style={{ background: '#c4322a', color: '#fff' }}>
        <h2 className="text-4xl sm:text-6xl leading-tight max-w-3xl mx-auto" style={{ fontFamily: SERIF, fontWeight: 600 }}>
          Taste the difference stone makes.
        </h2>
        <button
          onClick={() => navigate('/products')}
          className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          style={{ background: '#1a1512', color: '#efe9df' }}
        >
          Shop the spice collection <ArrowRight size={18} aria-hidden />
        </button>
      </section>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {activeCheckoutProduct && (
        <OrderForm selectedProduct={activeCheckoutProduct} onClose={() => setActiveCheckoutProduct(null)} />
      )}

      <WhatsAppButton />
    </div>
  );
}

export default StoryPage;