import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, ShoppingBag, Star, CheckCircle2 } from 'lucide-react';

function Hero({ navigate }) {
  return (
    <section className="relative min-h-[90vh] bg-white pt-32 pb-20 overflow-hidden flex items-center border-b border-gray-100">
      
      {/* Crisp Ambient Backdrop Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean Web Accessibility Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-50 border border-red-200/80 text-red-800 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-xs">
              <Sparkles size={14} className="text-amber-600 flex-shrink-0" /> Single-Estate Guntur Sannam · Stone Ground
            </div>

            {/* Main Headline */}
            <h1 className="font-sans text-gray-900 font-extrabold leading-[1.1] text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
              Artisan Guntur <br />
              <span className="text-red-800 font-bold">Mirchi Powder</span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-700 text-sm sm:text-lg lg:text-xl leading-relaxed font-normal font-sans max-w-2xl">
              Slow cold-pounded in traditional granite mortars to preserve volatile capsaicin oils.{' '}
              <strong className="text-gray-900 font-semibold">100% pure, zero Sudan Red dye, zero added preservatives.</strong>
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigate ? navigate('/products') : (window.location.href = '/products')}
                className="group relative overflow-hidden bg-red-800 hover:bg-red-900 text-white font-extrabold py-3.5 sm:py-4 px-8 sm:px-9 rounded-full text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Shop Collection</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('story');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (navigate) navigate('/#story');
                }}
                className="px-7 py-3.5 sm:py-4 rounded-full border-2 border-gray-200 hover:border-red-800 text-gray-800 hover:text-red-800 font-bold text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] bg-white hover:bg-gray-50 transition-all duration-300 shadow-xs text-center"
              >
                Discover Our Craft
              </button>
            </div>

            {/* High-Contrast Web Accessibility Micro Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200">
              {[
                { num: '100%', label: 'Cold Stone Ground' },
                { num: '0%', label: 'Sudan Red Dye' },
                { num: '7-10 Days', label: 'Sun Cured' },
                { num: '48H', label: 'Fresh Dispatch' },
              ].map((s, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-200/80 space-y-0.5 sm:space-y-1">
                  <div className="text-red-800 font-sans font-extrabold text-xl sm:text-2xl lg:text-3xl">
                    {s.num}
                  </div>
                  <div className="text-gray-800 text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold font-sans leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Showcase Visual Card */}
          <div className="lg:col-span-5 relative font-sans">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-800/10 via-amber-500/10 to-transparent rounded-3xl transform rotate-3 scale-105" />

              {/* Main Floating Product Display Card */}
              <div className="relative bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 space-y-6">
                
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group">
                  <img
                    src="/images/masala_karam.png"
                    alt="Masala Karam Jar"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600'; }}
                  />
                  <div className="absolute top-3 left-3 bg-red-800 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles size={11} /> Flagship Blend
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-amber-700 font-sans font-extrabold text-2xl px-3.5 py-1 rounded-full shadow-md">
                    ₹300
                  </div>
                </div>

                {/* Card Info */}
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans font-bold text-xl text-gray-900">Masala Karam</h3>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star size={14} className="fill-amber-500 text-amber-500" />
                      <span>4.9 / 5 (128 reviews)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed font-normal">
                    Hand-blended with roasted coriander, cumin, and fresh garlic cloves. Pounded in granite mortars.
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 size={14} /> 100% Guntur Heirloom
                    </span>
                    <span className="text-gray-500 font-semibold">250g Net Wt</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;
