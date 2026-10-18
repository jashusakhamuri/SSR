import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import OrderForm from '../components/OrderForm';
import CartDrawer from '../components/CartDrawer';
import ReviewsSection from '../components/ReviewsSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { getProducts } from '../services/api';
import { Sparkles, ShoppingCart, X, Search, SlidersHorizontal, Star, Flame, RotateCcw, Filter, Check } from 'lucide-react';

function ProductsPage({ navigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Amazon-Style Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [minHeatLevel, setMinHeatLevel] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

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
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Cart handlers
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          weight: product.weight,
          image: product.image,
          quantity,
        },
      ];
    });

    setToastMessage(`Added "${product.name}" to your Cart!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Amazon Filter Logic
  let filtered = products.filter(p => {
    // Keyword search
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Category filter
    if (selectedCategory === 'fiery' && !(p.name.includes('Goddu') || p.name.includes('Masala') || p.name.includes('Nalla'))) return false;
    if (selectedCategory === 'podis' && !(p.name.includes('Podi') || p.name.includes('Kandi'))) return false;
    if (selectedCategory === 'chutney' && !(p.name.includes('Chutney') || p.name.includes('Kobbari') || p.name.includes('Peanut'))) return false;

    // Price range filter
    const price = parseFloat(p.price);
    if (selectedPriceRange === 'under-250' && price >= 250) return false;
    if (selectedPriceRange === '250-350' && (price < 250 || price > 350)) return false;
    if (selectedPriceRange === 'over-350' && price <= 350) return false;

    // Heat rating filter
    if (minHeatLevel > 0 && p.spice_level < minHeatLevel) return false;

    return true;
  });

  // Sorting
  if (sortBy === 'price-low') filtered.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
  if (sortBy === 'price-high') filtered.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
  if (sortBy === 'heat-high') filtered.sort((a,b) => b.spice_level - a.spice_level);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setMinHeatLevel(0);
    setMinRating(0);
    setSortBy('featured');
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header Navigation */}
      <Navbar 
        navigate={navigate} 
        cartCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        currentPath="/products"
      />

      {/* Toast Notification */}
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
            View Cart
          </button>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="pt-28 pb-6 sm:pb-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Amazon-Style Search Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-red-800 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] block">
                Single-Estate Guntur Collection
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-gray-900">
                Shop Spices & Reviews
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in Spices (e.g. Masala, Podi, Garlic)..."
                className="w-full bg-white border border-gray-300 rounded-full pl-11 pr-4 py-2.5 sm:py-3 text-xs text-gray-900 focus:outline-none focus:border-red-800 shadow-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Main Section */}
      <section className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 font-sans">
        
        {/* Amazon-Style Toolbar: Filter Tab Opener, Active Tags, and Sort Bar */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-8 space-y-3">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Filter Tab Opener Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 hover:border-red-800 text-gray-900 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                title="Click to open filter options"
              >
                <Filter size={16} className="text-red-800" />
                <span>Filters</span>
                {((selectedCategory !== 'all' ? 1 : 0) + (selectedPriceRange !== 'all' ? 1 : 0) + (minHeatLevel > 0 ? 1 : 0)) > 0 && (
                  <span className="bg-red-800 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                    {(selectedCategory !== 'all' ? 1 : 0) + (selectedPriceRange !== 'all' ? 1 : 0) + (minHeatLevel > 0 ? 1 : 0)}
                  </span>
                )}
              </button>

              <span className="text-xs text-gray-600">
                Showing <strong className="text-gray-900 font-bold">{filtered.length}</strong> of {products.length} Spices
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <SlidersHorizontal size={14} className="text-gray-500" />
              <span className="text-xs text-gray-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold focus:outline-none focus:border-red-800 shadow-xs"
              >
                <option value="featured">Featured / Bestselling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="heat-high">Pungency: High to Low</option>
              </select>
            </div>

          </div>

          {/* Active Filter Badges */}
          {((selectedCategory !== 'all' ? 1 : 0) + (selectedPriceRange !== 'all' ? 1 : 0) + (minHeatLevel > 0 ? 1 : 0) + (searchQuery ? 1 : 0)) > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200 text-xs">
              <span className="text-gray-500 font-medium">Active Filters:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-300 px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-800"><X size={12} /></button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-300 px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                  Category: {selectedCategory === 'fiery' ? 'Fiery Karams' : selectedCategory === 'podis' ? 'Comfort Podis' : 'Chutney Powders'}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-red-800"><X size={12} /></button>
                </span>
              )}

              {selectedPriceRange !== 'all' && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-300 px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                  Price: {selectedPriceRange === 'under-250' ? 'Under Rs 250' : selectedPriceRange === '250-350' ? 'Rs 250 - Rs 350' : 'Over Rs 350'}
                  <button onClick={() => setSelectedPriceRange('all')} className="hover:text-red-800"><X size={12} /></button>
                </span>
              )}

              {minHeatLevel > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-300 px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                  Pungency: Level {minHeatLevel}+
                  <button onClick={() => setMinHeatLevel(0)} className="hover:text-red-800"><X size={12} /></button>
                </span>
              )}

              <button
                onClick={resetAllFilters}
                className="text-xs text-red-800 font-bold hover:underline ml-2 flex items-center gap-1"
              >
                <RotateCcw size={12} /> Clear all
              </button>
            </div>
          )}

        </div>

        {/* ── Filter Tab Slide-Over Drawer ── */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
              onClick={() => setIsFilterOpen(false)}
            />

            {/* Filter Drawer Tab Panel */}
            <div className="fixed inset-y-0 left-0 max-w-full flex">
              <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col z-10 animate-fade-in">
                
                {/* Header */}
                <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter size={18} className="text-red-800" />
                    <h2 className="font-bold text-base text-gray-900">
                      Filter Spices
                    </h2>
                    {((selectedCategory !== 'all' ? 1 : 0) + (selectedPriceRange !== 'all' ? 1 : 0) + (minHeatLevel > 0 ? 1 : 0)) > 0 && (
                      <span className="bg-red-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {(selectedCategory !== 'all' ? 1 : 0) + (selectedPriceRange !== 'all' ? 1 : 0) + (minHeatLevel > 0 ? 1 : 0)} Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={resetAllFilters}
                      className="text-xs text-red-800 font-bold hover:underline flex items-center gap-1"
                    >
                      <RotateCcw size={12} /> Clear All
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
                      aria-label="Close Filter Tab"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Filter Options Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
                  
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900">
                      Category
                    </h3>
                    <div className="space-y-1.5">
                      {[
                        { id: 'all', label: 'All Spices' },
                        { id: 'fiery', label: 'Fiery Karams' },
                        { id: 'podis', label: 'Comfort Podis' },
                        { id: 'chutney', label: 'Chutney Powders' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                            selectedCategory === cat.id
                              ? 'bg-red-800 text-white font-bold'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span>{cat.label}</span>
                          {selectedCategory === cat.id && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="space-y-3 border-t border-gray-200 pt-5">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900">
                      Price Range
                    </h3>
                    <div className="space-y-1.5">
                      {[
                        { id: 'all', label: 'All Prices' },
                        { id: 'under-250', label: 'Under Rs 250' },
                        { id: '250-350', label: 'Rs 250 to Rs 350' },
                        { id: 'over-350', label: 'Over Rs 350' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPriceRange(p.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                            selectedPriceRange === p.id
                              ? 'bg-red-800 text-white font-bold'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span>{p.label}</span>
                          {selectedPriceRange === p.id && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Heat Pungency Filter */}
                  <div className="space-y-3 border-t border-gray-200 pt-5">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900">
                      Heat Pungency
                    </h3>
                    <div className="space-y-1.5">
                      {[
                        { level: 0, label: 'All Heat Levels' },
                        { level: 4, label: 'Level 4 and Above (Extra Hot)' },
                        { level: 3, label: 'Level 3 and Above (Medium)' },
                        { level: 1, label: 'Level 1 and Above (Mild)' },
                      ].map((h) => (
                        <button
                          key={h.level}
                          onClick={() => setMinHeatLevel(h.level)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                            minHeatLevel === h.level
                              ? 'bg-red-800 text-white font-bold'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span>{h.label}</span>
                          {minHeatLevel === h.level && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Drawer Footer Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                  <button
                    onClick={resetAllFilters}
                    className="flex-1 border border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 bg-red-800 hover:bg-red-900 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Show {filtered.length} Spices
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── Product Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <div className="aspect-[4/5] shimmer" />
                <div className="p-6 space-y-3">
                  <div className="shimmer h-6 rounded w-2/3" />
                  <div className="shimmer h-4 rounded w-full" />
                  <div className="shimmer h-10 rounded-full w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto text-gray-500">
              <Search size={28} />
            </div>
            <h3 className="font-bold text-xl text-gray-900">No spices match your selected filters</h3>
            <p className="text-gray-500 text-xs">Try clearing your price range or category filter.</p>
            <button
              onClick={resetAllFilters}
              className="bg-red-800 hover:bg-red-900 text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(prod) => handleAddToCart(prod)}
                onBuy={(prod) => {
                  handleAddToCart(prod);
                  setIsCartOpen(true);
                }}
                onViewDetails={(prod) => setActiveDetailProduct(prod)}
              />
            ))}
          </div>
        )}

      </section>

      {/* ── Customer Reviews Section (Products + Reviews together on /products) ── */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Spacious Full-Featured Cart Modal */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Detail Modal */}
      {activeDetailProduct && (
        <ProductDetailModal 
          product={activeDetailProduct}
          onClose={() => setActiveDetailProduct(null)}
          onAddToCart={(prod) => handleAddToCart(prod)}
          onBuy={(prod) => {
            handleAddToCart(prod);
            setIsCartOpen(true);
          }}
        />
      )}

      {/* WhatsApp CTA */}
      <WhatsAppButton />

    </div>
  );
}

export default ProductsPage;
