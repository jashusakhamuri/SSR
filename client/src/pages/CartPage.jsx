import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { createOrder } from '../services/api';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, CheckCircle2, ShieldCheck, Lock, Check } from 'lucide-react';

function CartPage({ navigate }) {
  // Cart items from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mirchi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponError, setCouponError] = useState(null);

  // Customer Shipping Details
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    payment_method: 'COD'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mirchi_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

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

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = parseFloat(((subtotal * discountPercent) / 100).toFixed(2));
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = cartItems.length > 0 ? (discountedSubtotal > 1000 ? 0 : 50) : 0;
  const gst = parseFloat((discountedSubtotal * 0.18).toFixed(2));
  const grandTotal = parseFloat((discountedSubtotal + shipping + gst).toFixed(2));
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Coupon application
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'MIRCHI10' || code === 'FIRST10') {
      setDiscountPercent(10);
      setCouponApplied('10% OFF Special Discount Applied!');
    } else if (code === 'FREESHIP') {
      setDiscountPercent(5);
      setCouponApplied('Free Shipping Voucher Applied!');
    } else if (code === 'GUNTUR20') {
      setDiscountPercent(20);
      setCouponApplied('20% Festive Spice Offer Applied!');
    } else {
      setCouponError('Invalid coupon code. Try MIRCHI10 for 10% off!');
    }
  };

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerInfo.customer_name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in your Name, Phone Number, and Shipping Address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        product_id: cartItems[0]?.id || 1,
        customer_name: customerInfo.customer_name,
        phone: customerInfo.phone,
        email: customerInfo.email || 'customer@example.com',
        address: `${customerInfo.address}, ${customerInfo.city} - ${customerInfo.pincode}`,
        quantity: totalItemCount,
        total_amount: grandTotal
      };

      const result = await createOrder(orderPayload);
      setOrderSuccess(result);
      setCartItems([]);
    } catch (err) {
      console.error('Error submitting order', err);
      alert('Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header Navigation */}
      <Navbar 
        navigate={navigate} 
        cartCount={totalItemCount} 
        onOpenCart={() => navigate('/cart')}
        currentPath="/cart"
      />

      {/* Full-Page Amazon-Style Cart Container */}
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {orderSuccess ? (
          /* Order Confirmed Screen */
          <div className="bg-white rounded-3xl p-12 shadow-xl text-center max-w-2xl mx-auto my-12 border border-gray-200 space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900">Order Confirmed!</h2>
            <p className="text-gray-600 text-base">
              Thank you <strong className="text-gray-900">{customerInfo.customer_name}</strong>! Your order <strong className="text-red-800">#{orderSuccess.order_id || 'MS-' + Math.floor(Math.random()*8999 + 1000)}</strong> has been received and is being prepared.
            </p>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-left text-xs space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">Grand Total:</span> <strong className="text-red-800 text-lg">₹{grandTotal.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping Address:</span> <strong className="text-gray-900">{customerInfo.address}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Payment Choice:</span> <strong className="text-gray-900">{customerInfo.payment_method === 'COD' ? 'Cash on Delivery' : 'Online / UPI'}</strong></div>
            </div>

            <button
              onClick={() => navigate('/products')}
              className="bg-red-800 hover:bg-red-900 text-white font-extrabold py-4 px-9 rounded-full text-xs uppercase tracking-widest shadow-xl transition-all"
            >
              Back to Shop Spices
            </button>
          </div>
        ) : (
          <div>
            
            {/* Top Breadcrumb Header */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900">
                Shopping Cart <span className="text-gray-500 text-xl font-normal">({totalItemCount} items)</span>
              </h1>
              <button 
                onClick={() => navigate('/products')}
                className="text-xs text-red-800 font-bold hover:underline flex items-center gap-1"
              >
                ← Continue Shopping
              </button>
            </div>

            {cartItems.length === 0 ? (
              /* Empty Cart Screen */
              <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-200 space-y-6">
                <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart size={40} className="text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-sans font-bold text-2xl sm:text-3xl text-gray-900">Your Cart is empty</h2>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Your shopping cart is currently empty. Explore our collection of  Guntur spices and traditional podis.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/products')}
                  className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold py-4 px-9 rounded-full text-xs uppercase tracking-widest shadow-md transition-all"
                >
                  Shop Spices Collection
                </button>
              </div>
            ) : (
              /* Full-Width Amazon 2-Column Cart Layout (Left: Items list (8 col), Right: Order summary & Checkout (4 col)) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* ── Left Column: Cart Items List & Coupon Code (8 Cols) ── */}
                <div className="lg:col-span-8 space-y-6">
                  
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Product Details</span>
                      <button 
                        onClick={handleClearCart}
                        className="text-xs font-semibold text-gray-400 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Clear All Items
                      </button>
                    </div>

                    {/* Item Cards */}
                    <div className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                          
                          {/* Image Thumbnail */}
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-2xl border border-gray-200 flex-shrink-0 bg-gray-50"
                            onError={(e) => { e.target.src = '/images/masala_karam.png'; }}
                          />

                          {/* Info & Quantity */}
                          <div className="flex-1 min-w-0 space-y-2">
                            <h3 className="font-sans font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
                              {item.name}
                            </h3>
                            <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                              <Check size={14} /> In Stock · Fresh Guntur Small Batch
                            </p>
                            <p className="text-xs text-gray-500">
                              Package Weight: <strong className="text-gray-800">{item.weight}</strong>
                            </p>

                            {/* + / - Controls & Remove Link */}
                            <div className="flex items-center gap-4 pt-2">
                              <div className="flex items-center border border-gray-300 rounded-full bg-gray-50 shadow-xs">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-l-full transition-colors font-bold"
                                  title="Decrease"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="px-4 py-1 text-xs font-extrabold text-gray-900">
                                  Qty: {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-r-full transition-colors font-bold"
                                  title="Increase"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-xs font-bold text-red-800 hover:underline flex items-center gap-1"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          {/* Price Subtotal */}
                          <div className="text-right flex-shrink-0 sm:self-start">
                            <span className="text-xs text-gray-400 block font-normal">Price</span>
                            <span className="font-sans font-extrabold text-xl sm:text-2xl text-red-800">
                              ₹{(item.price * item.quantity).toFixed(0)}
                            </span>
                            <span className="text-[10px] text-gray-500 block">
                              (₹{item.price} each)
                            </span>
                          </div>

                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200 text-right text-sm">
                      Subtotal ({totalItemCount} items): <strong className="font-sans text-2xl text-gray-900 font-extrabold ml-2">₹{subtotal.toFixed(2)}</strong>
                    </div>

                  </div>

                    {/* Coupon Code Card */}
                    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-200 space-y-3">
                      <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block flex items-center gap-2">
                        <Tag size={16} className="text-amber-600" /> Apply Promo Code / Gift Voucher
                      </label>
                      <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="e.g. MIRCHI10"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-900 focus:outline-none focus:border-red-800"
                        />
                        <button
                          type="submit"
                          className="bg-gray-900 hover:bg-gray-800 text-white font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm w-full sm:w-auto"
                        >
                          Apply Coupon
                        </button>
                      </form>
                      {couponApplied && (
                        <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 size={16} /> {couponApplied}
                        </p>
                      )}
                      {couponError && (
                        <p className="text-xs text-red-700 font-bold">
                          {couponError}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* ── Right Column: Customer Details & Amazon Checkout Box (4 Cols) ── */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-200 space-y-6 lg:sticky lg:top-28">
                    
                    {/* Primary Yellow Checkout Button */}
                    <div className="space-y-3">
                      <div className="text-xs text-gray-600">
                        Subtotal ({totalItemCount} items): <strong className="text-gray-900 font-bold">₹{subtotal.toFixed(2)}</strong>
                      </div>
                      
                      <button
                        type="submit"
                        form="amazon-checkout-form"
                        disabled={isSubmitting}
                        className="w-full bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold py-4 rounded-full text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        {isSubmitting ? 'Processing...' : `Proceed to Checkout (${totalItemCount} items)`} <ArrowRight size={16} />
                      </button>
                    </div>

                    {/* Order Summary Spec Box */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs text-gray-700">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">Order Summary</h4>
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Coupon Discount</span>
                          <span>- ₹{discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Express Shipping</span>
                        <span className="font-bold text-gray-900">{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span className="font-bold text-gray-900">₹{gst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-red-800 pt-3 border-t border-gray-200">
                        <span className="font-sans text-base sm:text-lg text-gray-900 font-bold">Total Order Amount</span>
                        <span className="font-sans text-2xl text-red-800 font-extrabold">₹{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Customer Info Input Form */}
                    <div className="space-y-4 pt-2 border-t border-gray-200">
                      <h4 className="font-sans font-bold text-base sm:text-lg text-gray-900 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-red-800" /> Delivery & Payment Info
                      </h4>

                      <form id="amazon-checkout-form" onSubmit={handleSubmitOrder} className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                          <input
                            type="text"
                            name="customer_name"
                            required
                            value={customerInfo.customer_name}
                            onChange={handleInputChange}
                            placeholder="e.g. Ramesh Varma"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-800"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile Phone *</label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={customerInfo.phone}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Pincode *</label>
                            <input
                              type="text"
                              name="pincode"
                              required
                              value={customerInfo.pincode}
                              onChange={handleInputChange}
                              placeholder="522001"
                              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Shipping Address *</label>
                          <textarea
                            name="address"
                            required
                            rows="2"
                            value={customerInfo.address}
                            onChange={handleInputChange}
                            placeholder="House No, Street, Landmark"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-800"
                          />
                        </div>

                        {/* Payment Method */}
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Select Payment</label>
                          <div className="grid grid-cols-2 gap-2">
                            <label className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                              customerInfo.payment_method === 'COD' ? 'bg-red-800 text-white border-red-800' : 'bg-gray-50 text-gray-700 border-gray-300'
                            }`}>
                              <input
                                type="radio"
                                name="payment_method"
                                value="COD"
                                checked={customerInfo.payment_method === 'COD'}
                                onChange={handleInputChange}
                                className="hidden"
                              />
                              Cash on Delivery
                            </label>

                            <label className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                              customerInfo.payment_method === 'ONLINE' ? 'bg-red-800 text-white border-red-800' : 'bg-gray-50 text-gray-700 border-gray-300'
                            }`}>
                              <input
                                type="radio"
                                name="payment_method"
                                value="ONLINE"
                                checked={customerInfo.payment_method === 'ONLINE'}
                                onChange={handleInputChange}
                                className="hidden"
                              />
                              UPI / Online Card
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="text-[10px] text-center text-gray-400 font-normal flex items-center justify-center gap-1 pt-2">
                      <Lock size={12} /> 256-Bit SSL Encrypted Direct Dispatch
                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp CTA */}
      <WhatsAppButton />
    </div>
  );
}

export default CartPage;
