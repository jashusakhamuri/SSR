import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, ShoppingCart, Sparkles } from 'lucide-react';

function Navbar({ navigate, cartCount = 0, onOpenCart, currentPath = '/' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path, hash) => {
    setIsOpen(false);
    if (navigate) {
      if (currentPath !== path && path !== '/') {
        navigate(path);
      } else if (hash) {
        if (currentPath !== '/') {
          navigate('/' + hash);
        } else {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(path);
      }
    } else {
      window.location.href = path + (hash || '');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* ── Brand Logo ── */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('/')}
          >
            {/* Circular farmer icon mark */}
            <img
              src="/images/ssr_logo_icon.jpg"
              alt="SSR Store"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-200 flex-shrink-0 ring-2 ring-red-800/20"
            />
            {/* Wordmark: SSR large + STORE small below */}
            <div className="flex flex-col leading-none select-none">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-gray-900 leading-none">SSR</span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-red-800 uppercase leading-none mt-0.5">Store</span>
            </div>
          </div>

          {/* ── Desktop Navigation Links ── */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => handleNavClick('/')}
              className={`font-semibold tracking-wider text-xs uppercase transition-colors ${
                currentPath === '/' ? 'text-red-800 font-bold border-b-2 border-red-800 pb-0.5' : 'text-gray-700 hover:text-red-800'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('/products')}
              className={`font-semibold tracking-wider text-xs uppercase transition-colors ${
                currentPath === '/products' ? 'text-red-800 font-bold border-b-2 border-red-800 pb-0.5' : 'text-gray-700 hover:text-red-800'
              }`}
            >
              Shop Spices
            </button>

            <button
              onClick={() => handleNavClick('/', '#story')}
              className="font-semibold tracking-wider text-xs uppercase text-gray-700 hover:text-red-800 transition-colors"
            >
              Our Story
            </button>

            <button
              onClick={() => handleNavClick('/', '#contact')}
              className="font-semibold tracking-wider text-xs uppercase text-gray-700 hover:text-red-800 transition-colors"
            >
              Contact
            </button>

            {/* Cart Button */}
            <button
              onClick={() => handleNavClick('/cart')}
              className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-950 px-4 py-2.5 rounded-full font-extrabold tracking-wider text-xs uppercase shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
              title="View your cart"
            >
              <ShoppingCart size={15} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-800 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hidden Admin Compass */}
            <button
              onClick={() => handleNavClick('/admin')}
              className="p-1.5 rounded-full text-gray-400 hover:text-red-800 transition-colors"
              title="Admin Dashboard"
            >
              <Compass size={18} />
            </button>
          </nav>

          {/* ── Mobile Actions ── */}
          <div className="flex md:hidden items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNavClick('/cart')}
              className="relative p-2 rounded-full text-gray-900 hover:text-red-800 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-800 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 shadow-xl text-center space-y-4 font-sans text-sm animate-fade-in">
          <button onClick={() => handleNavClick('/')} className="block w-full font-bold text-gray-900 hover:text-red-800 py-2 border-b border-gray-100">Home Page</button>
          <button onClick={() => handleNavClick('/products')} className="block w-full font-bold text-gray-900 hover:text-red-800 py-2 border-b border-gray-100">Shop Spice Collection</button>
          <button onClick={() => handleNavClick('/', '#story')} className="block w-full font-bold text-gray-900 hover:text-red-800 py-2 border-b border-gray-100">Our Craft Story</button>
          <button onClick={() => handleNavClick('/', '#contact')} className="block w-full font-bold text-gray-900 hover:text-red-800 py-2 border-b border-gray-100">Contact Us</button>
          <div className="pt-2">
            <button 
              onClick={() => handleNavClick('/cart')} 
              className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 py-3.5 rounded-full font-bold tracking-wider uppercase text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart size={16} /> View Full Cart ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
