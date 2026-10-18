import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Info, Landmark, Lock } from 'lucide-react';
import { placeIndiaOrder, placeInternationalOrder } from '../services/api';

const COUNTRIES = [
  { name: 'United States', rate: 850.00, days: 7 },
  { name: 'United Kingdom', rate: 750.00, days: 6 },
  { name: 'Canada', rate: 900.00, days: 7 },
  { name: 'Australia', rate: 950.00, days: 8 },
  { name: 'Germany', rate: 800.00, days: 6 },
  { name: 'United Arab Emirates', rate: 500.00, days: 5 },
  { name: 'Singapore', rate: 600.00, days: 5 },
];

function OrderForm({ selectedProduct, onClose }) {
  const [customerType, setCustomerType] = useState('domestic'); // 'domestic' or 'international'
  
  // Fields state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    postal_code: '',
    country: 'United States',
    product: selectedProduct ? selectedProduct.name : 'Masala Karam',
    quantity: 1,
    special_instructions: '',
  });

  // Calculation variables
  const [calc, setCalc] = useState({
    price: 300,
    subtotal: 300,
    shipping: 50,
    gst: 54,
    total: 404,
  });

  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [errors, setErrors] = useState({});

  // Recalculate invoice when quantity, product, or destination changes
  useEffect(() => {
    const PRICES = {
      'Masala Karam': 300,
      'Goddu Karam': 600,
      'Kandi Podi': 250,
      'Nalla Karam': 350,
      'Kobbari Karam': 280,
      'Peanut Chutney Powder': 220,
    };
    const basePrice = PRICES[formData.product] ?? 300;
    const qty = parseInt(formData.quantity) || 1;
    const sub = basePrice * qty;

    let shipCost = 50.00;
    if (customerType === 'international') {
      const match = COUNTRIES.find(c => c.name === formData.country);
      shipCost = match ? match.rate : 1000.00;
    }

    const gstAmount = parseFloat((sub * 0.18).toFixed(2));
    const grandTotal = sub + shipCost + gstAmount;

    setCalc({ price: basePrice, subtotal: sub, shipping: shipCost, gst: gstAmount, total: grandTotal });
  }, [formData.product, formData.quantity, formData.country, customerType]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.phone.trim()) tempErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) tempErrors.address = 'Address is required';
    if (formData.quantity < 1) tempErrors.quantity = 'Quantity must be at least 1';

    if (customerType === 'domestic') {
      if (!formData.city.trim()) tempErrors.city = 'City is required';
      if (!formData.state.trim()) tempErrors.state = 'State is required';
      if (!formData.pincode.trim()) {
        tempErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        tempErrors.pincode = 'Pincode must be exactly 6 digits';
      }
    } else {
      if (!formData.email.trim()) {
        tempErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = 'Valid email is required';
      }
      if (!formData.postal_code.trim()) tempErrors.postal_code = 'Postal code is required';
      if (!formData.country.trim()) tempErrors.country = 'Country is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      let result;
      if (customerType === 'domestic') {
        result = await placeIndiaOrder({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          pincode: formData.pincode,
          state: formData.state,
          city: formData.city,
          quantity: formData.quantity,
          product: formData.product,
          special_instructions: formData.special_instructions,
        });
      } else {
        result = await placeInternationalOrder({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          address: formData.address,
          postal_code: formData.postal_code,
          quantity: formData.quantity,
          product: formData.product,
          special_instructions: formData.special_instructions,
        });
      }

      if (result && result.success) {
        setSuccessOrder(result.order);
      } else {
        alert('Order creation failed. Please check parameters.');
      }
    } catch (err) {
      console.error('Submit order failed', err);
      alert('Network error placing order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-earth-dark/60 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="relative bg-cream max-w-4xl w-full rounded-sm border-2 border-turmeric shadow-2xl overflow-hidden z-10 animate-fade-in max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-earth text-cream p-5 flex items-center justify-between border-b border-turmeric font-sans">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg text-white tracking-wide">Checkout Sheet</h2>
          </div>
          <button onClick={onClose} className="text-cream/70 hover:text-cream hover:bg-cream/10 p-1.5 rounded-full transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Container */}
        {successOrder ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 bg-leaf/10 text-leaf border border-leaf rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle size={36} />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-earth">Namaste, Order Confirmed!</h3>
              <p className="text-earth-light text-sm max-w-md mx-auto font-light">
                Your order <strong>#{successOrder.id}</strong> has been successfully placed. We have triggered confirmation emails to you and our logistics team.
              </p>
            </div>

            {/* Invoice card in success */}
            <div className="max-w-md mx-auto bg-cream-light p-6 border-stitched-light rounded-sm text-left shadow-sm space-y-4">
              <div className="flex justify-between border-b border-earth/10 pb-2 text-xs">
                <span className="font-bold">Customer:</span>
                <span>{successOrder.customer_name}</span>
              </div>
              <div className="flex justify-between border-b border-earth/10 pb-2 text-xs">
                <span className="font-bold">Item:</span>
                <span>{successOrder.product} (x{successOrder.quantity})</span>
              </div>
              <div className="flex justify-between border-b border-earth/10 pb-2 text-xs">
                <span className="font-bold">Total Paid:</span>
                <span className="text-chilli font-bold">₹{parseFloat(successOrder.total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-leaf font-bold">
                <span>Shipping Status:</span>
                <span>Ready to Pack</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="bg-chilli hover:bg-chilli-dark text-cream font-bold py-3 px-8 rounded-sm text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Back to Store
            </button>
          </div>
        ) : (
          /* Main Order form & Invoice Grid */
          <div className="flex-grow overflow-y-auto p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Side */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
                
                {/* Tabs selection */}
                <div className="flex rounded-sm overflow-hidden border border-earth/20 p-1 bg-cream-dark/30">
                  <button
                    type="button"
                    onClick={() => setCustomerType('domestic')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-all ${
                      customerType === 'domestic' 
                        ? 'bg-chilli text-cream shadow-sm' 
                        : 'text-earth hover:bg-earth/5'
                    }`}
                  >
                    India Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerType('international')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-all ${
                      customerType === 'international' 
                        ? 'bg-chilli text-cream shadow-sm' 
                        : 'text-earth hover:bg-earth/5'
                    }`}
                  >
                    International Order
                  </button>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Common Fields */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      className={`w-full bg-cream-light border ${errors.name ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-[10px] text-chilli mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  {/* Email — shown for BOTH domestic and international */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">
                      Email Address {customerType === 'domestic' && <span className="text-earth/40 font-normal normal-case">(optional — for order confirmation)</span>}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-cream-light border ${errors.email ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                      placeholder="customer@domain.com"
                    />
                    {errors.email && <p className="text-[10px] text-chilli mt-1 font-semibold">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className={`w-full bg-cream-light border ${errors.phone ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                      placeholder="e.g. +91 98765 43210"
                    />
                    {errors.phone && <p className="text-[10px] text-chilli mt-1 font-semibold">{errors.phone}</p>}
                  </div>

                  {customerType === 'international' ? (
                    <div>
                      <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Country</label>
                      <select 
                        name="country" 
                        value={formData.country} 
                        onChange={handleChange}
                        className="w-full bg-cream-light border border-earth/20 focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none"
                      >
                        {COUNTRIES.map((c, idx) => (
                          <option key={idx} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">State</label>
                      <input 
                        type="text" 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange}
                        className={`w-full bg-cream-light border ${errors.state ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                        placeholder="e.g. Andhra Pradesh"
                      />
                      {errors.state && <p className="text-[10px] text-chilli mt-1 font-semibold">{errors.state}</p>}
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Delivery Address</label>
                    <textarea 
                      name="address" 
                      rows="2"
                      value={formData.address} 
                      onChange={handleChange}
                      className={`w-full bg-cream-light border ${errors.address ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                      placeholder="Door number, Street name, Locality"
                    ></textarea>
                    {errors.address && <p className="text-[10px] text-chilli mt-1 font-semibold">{errors.address}</p>}
                  </div>

                  {customerType === 'domestic' ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">City</label>
                        <input 
                          type="text" 
                          name="city" 
                          value={formData.city} 
                          onChange={handleChange}
                          className={`w-full bg-cream-light border ${errors.city ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                          placeholder="e.g. Guntur"
                        />
                        {errors.city && <p className="text-[10px] text-chilli mt-1 font-semibold">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Pincode (6 Digits)</label>
                        <input 
                          type="text" 
                          name="pincode" 
                          value={formData.pincode} 
                          onChange={handleChange}
                          className={`w-full bg-cream-light border ${errors.pincode ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                          placeholder="e.g. 522001"
                        />
                        {errors.pincode && <p className="text-[10px] text-chilli mt-1 font-semibold">{errors.pincode}</p>}
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Postal / Zip Code</label>
                      <input 
                        type="text" 
                        name="postal_code" 
                        value={formData.postal_code} 
                        onChange={handleChange}
                        className={`w-full bg-cream-light border ${errors.postal_code ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                        placeholder="e.g. 90210"
                      />
                      {errors.postal_code && <p className="text-[10px] text-chilli mt-1 font-semibold">{errors.postal_code}</p>}
                    </div>
                  )}

                  {/* Quantity and Product */}
                  <div>
                    <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Product Choice</label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full bg-cream-light border border-earth/20 focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none"
                    >
                      <option value="Masala Karam">Masala Karam — ₹300 / 250g</option>
                      <option value="Goddu Karam">Goddu Karam — ₹600 / 500g</option>
                      <option value="Kandi Podi">Kandi Podi — ₹250 / 200g</option>
                      <option value="Nalla Karam">Nalla Karam — ₹350 / 300g</option>
                      <option value="Kobbari Karam">Kobbari Karam — ₹280 / 200g</option>
                      <option value="Peanut Chutney Powder">Peanut Chutney Powder — ₹220 / 200g</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Quantity (Packs)</label>
                    <input 
                      type="number" 
                      name="quantity" 
                      min="1"
                      value={formData.quantity} 
                      onChange={handleChange}
                      className="w-full bg-cream-light border border-earth/20 focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-earth uppercase tracking-widest mb-1.5">Special Instructions (Optional)</label>
                    <textarea 
                      name="special_instructions" 
                      rows="2"
                      value={formData.special_instructions} 
                      onChange={handleChange}
                      className="w-full bg-cream-light border border-earth/20 focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none"
                      placeholder="e.g. Please grind it extra fine if possible, thank you."
                    ></textarea>
                  </div>

                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-chilli hover:bg-chilli-dark disabled:bg-earth/40 text-cream font-bold py-4 rounded-sm text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading ? 'Processing Order...' : 'Confirm Order & Pay'}
                </button>

              </form>

              {/* Invoice Side */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                <div className="bg-cream p-6 border-stitched rounded-sm shadow-md space-y-6 relative overflow-hidden">
                  
                  <h3 className="font-sans font-bold text-xl text-earth border-b-2 border-dashed border-earth/20 pb-3 flex items-center justify-between">
                    <span>Invoice Summary</span>
                    <span className="text-xs uppercase tracking-wider bg-earth/10 text-earth px-2 py-0.5 rounded-sm font-sans font-bold">Preview</span>
                  </h3>

                  {/* Calculations */}
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between text-earth-light">
                      <span>Item:</span>
                      <span className="font-semibold text-earth">{formData.product}</span>
                    </div>
                    
                    <div className="flex justify-between text-earth-light">
                      <span>Base Price:</span>
                      <span>₹{calc.price.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-earth-light">
                      <span>Quantity:</span>
                      <span>{formData.quantity} Pack(s)</span>
                    </div>

                    <hr className="border-dashed border-earth/10" />

                    <div className="flex justify-between text-earth-light">
                      <span>Product Subtotal:</span>
                      <span>₹{calc.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-earth-light">
                      <span>Shipping & Logistics:</span>
                      <span>₹{calc.shipping.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-earth-light">
                      <span>GST (18% Retail Spices):</span>
                      <span>₹{calc.gst.toFixed(2)}</span>
                    </div>

                    <hr className="border-2 border-double border-earth/20" />

                    <div className="flex justify-between font-bold text-base text-chilli">
                      <span>Grand Total:</span>
                      <span>₹{calc.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Information banner */}
                  <div className="bg-turmeric/10 border border-turmeric/20 p-4 rounded-xs text-[11px] text-earth-light leading-relaxed flex items-start gap-2">
                    <Info size={16} className="text-turmeric-dark shrink-0 mt-0.5" />
                    <div>
                      <strong>Traditional Preparation Notice:</strong> Because our spice blends contain zero artificial anti-caking agents, they may settle or clump slightly. Tap the jar to loosen. Keep in airtight containers.
                    </div>
                  </div>

                  {/* Trust badge */}
                  <div className="border-t border-earth/10 pt-4 flex items-center justify-center gap-2 text-[10px] text-earth-light uppercase font-bold tracking-wider select-none">
                    <Lock size={12} className="text-earth-light" /> SSL Encrypted Checkout &bull; COD Available
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default OrderForm;
