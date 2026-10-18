import React from 'react';
import { Flame, ShoppingBag, ShoppingCart, Eye, Sparkles, Award } from 'lucide-react';

function ProductCard({ product, onAddToCart, onBuy, onViewDetails }) {
  const flames = Array.from({ length: 5 });

  const tasteTags = {
    1: ['Curry Base', 'Toasted Cumin', 'Garlic Warmth'],
    2: ['Pure Guntur S4', 'Deep Scarlet', 'Extra Hot'],
    3: ['Toor Dal Comfort', 'Ghee Pairing', 'Traditional Podi'],
    4: ['Roasted Sesame', 'Nutty Undertones', 'Crispy Dosa Match'],
    5: ['Dry Coconut', 'Coastal Andhra', 'Mild Heat'],
    6: ['Roasted Peanuts', 'Zero Oil', 'Idli Favourite'],
  };

  const tags = tasteTags[product.id] || ['Cold Stone Pounded', 'Pure Spice', 'Preservative Free'];

  return (
    <div className="group relative bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#C89B3C]/25 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between">

      {/* ── Top Image Aspect Ratio 4/5 ── */}
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-brand-dark cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transitionTimingFunction: 'cubic-bezier(.25,.46,.45,.94)' }}
          onError={(e) => { e.target.src = '/images/masala_karam.png'; }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C120F] via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="bg-brand-crimson text-white text-[9px] font-extrabold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-md">
            <Sparkles size={10} className="text-brand-saffron" /> Cold Stone Pounded
          </span>
          {product.id === 2 && (
            <span className="bg-brand-saffron text-brand-dark text-[9px] font-extrabold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-md">
              Heritage Bestseller
            </span>
          )}
        </div>

        {/* Weight & Price Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 font-sans">
          <span className="text-white/90 text-[10px] font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            {product.weight}
          </span>
          <div className="text-right">
            <span className="text-[9px] text-white/70 block uppercase tracking-widest leading-none font-bold">Small-Batch</span>
            <span className="text-brand-saffron font-extrabold text-2xl leading-tight">
              ₹{parseFloat(product.price).toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-4 font-sans">

        {/* Title & Spice Heat Meter */}
        <div>
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-bold text-xl text-gray-900 group-hover:text-red-800 transition-colors duration-200 leading-tight cursor-pointer"
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 w-fit">
            <span className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Pungency:</span>
            <div className="flex gap-0.5">
              {flames.map((_, i) => (
                <Flame key={i} size={13}
                  className={i < product.spice_level ? 'fill-red-800 text-red-800' : 'text-gray-300 fill-gray-300'} />
              ))}
            </div>
            <span className="text-[9px] font-bold text-red-800 ml-1">{product.spice_level}/5</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed font-normal line-clamp-2">
          {product.description}
        </p>

        {/* Taste Profile Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((t, i) => (
            <span key={i} className="text-[9px] font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full border border-gray-200">
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons — Clean Amazon-style layout */}
        <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
          {/* Primary: Add to Cart — Full Width */}
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <ShoppingCart size={15} /> Add to Cart
          </button>
          
          {/* Secondary Row: Buy Now + View Details */}
          <div className="flex gap-2">
            <button
              onClick={() => onBuy(product)}
              className="flex-1 bg-red-800 hover:bg-red-900 text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <ShoppingBag size={14} /> Buy Now
            </button>
            
            <button
              onClick={() => onViewDetails(product)}
              className="border-2 border-gray-300 hover:border-red-800 text-gray-700 hover:text-red-800 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center transition-colors"
              title="View Details"
            >
              <Eye size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;
