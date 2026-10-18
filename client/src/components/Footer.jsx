import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth text-cream pt-16 pb-8 border-t-4 border-turmeric">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* ── Brand Block ── */}
          <div className="space-y-5 sm:col-span-2">

            {/* Logo lockup */}
            <div className="flex items-center gap-3">
              <img
                src="/images/ssr_logo_icon.jpg"
                alt="SSR Store"
                className="w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-amber-500/40 flex-shrink-0"
              />
              <div className="flex flex-col leading-none select-none">
                <span className="font-black text-2xl tracking-tight text-amber-400 leading-none">SSR</span>
                <span className="text-[11px] font-bold tracking-[0.28em] text-cream/70 uppercase leading-none mt-1">Store</span>
              </div>
            </div>

            <p className="text-cream/70 text-xs sm:text-sm font-sans font-normal leading-relaxed max-w-sm">
              Authentic single-estate Guntur red chillies, cold stone-pounded in small artisan batches. Zero Sudan Red dye, zero preservatives, 100% natural aroma.
            </p>
            <div className="text-[10px] text-turmeric uppercase font-bold tracking-widest font-sans">
              Traditional Heritage Taste &bull; Kopparru Village, Guntur
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="space-y-3 font-sans">
            <h4 className="font-bold text-base text-turmeric-light tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-cream/80">
              <li><button onClick={() => window.navigateTo ? window.navigateTo('/') : window.location.href='/'} className="hover:text-chilli-light transition-colors">Home Page</button></li>
              <li><button onClick={() => window.navigateTo ? window.navigateTo('/products') : window.location.href='/products'} className="hover:text-chilli-light transition-colors">Shop Spices</button></li>
              <li><button onClick={() => window.navigateTo ? window.navigateTo('/cart') : window.location.href='/cart'} className="hover:text-chilli-light transition-colors">Your Cart</button></li>
              <li><a href="/#story" className="hover:text-chilli-light transition-colors">Our Craft Story</a></li>
              <li><a href="/#contact" className="hover:text-chilli-light transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* ── Contact Details ── */}
          <div className="space-y-3 font-sans">
            <h4 className="font-bold text-base text-turmeric-light tracking-wider">Store &amp; Support</h4>
            <div className="text-xs text-cream/80 leading-relaxed space-y-1">
              <p><strong>Sakhamuri Jaswanth</strong></p>
              <p>Kopparru Village, Guntur District,</p>
              <p>Andhra Pradesh, 522015, India</p>
              <p className="pt-1">
                WhatsApp / Phone:{' '}
                <a href="https://wa.me/919014119415" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">
                  +91 90141 19415
                </a>
              </p>
              <p>
                Email:{' '}
                <a href="mailto:sjaswanthconnect@gmail.com" className="text-amber-400 hover:underline">
                  sjaswanthconnect@gmail.com
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* ── Divider ── */}
        <hr className="border-cream/10 my-8" />

        {/* ── Copyright Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">

          {/* Copyright text */}
          <div className="flex items-center gap-2 text-[11px] text-cream/50">
            <img
              src="/images/ssr_logo_icon.jpg"
              alt=""
              className="w-5 h-5 rounded-full object-cover opacity-60"
            />
            <span>
              &copy; {currentYear}{' '}
              <strong className="text-cream/70 font-bold tracking-wide">SSR</strong>
              <span className="text-cream/40 font-normal"> — All Rights Reserved.</span>
            </span>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-4 items-center text-[11px] text-cream/40">
            <span className="cursor-pointer hover:text-cream/70 transition-colors">Pure Spice Guarantee</span>
            <span className="text-cream/20">&bull;</span>
            <span className="cursor-pointer hover:text-cream/70 transition-colors">Fast Shipping Across India</span>
            <span className="text-cream/20">&bull;</span>
            <span
              onClick={() => window.navigateTo ? window.navigateTo('/admin') : window.location.href='/admin'}
              className="cursor-pointer hover:text-chilli-light transition-colors font-bold uppercase tracking-wider"
            >
              Admin
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
