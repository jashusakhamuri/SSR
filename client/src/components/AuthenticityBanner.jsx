import React from 'react';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

function AuthenticityBanner() {
  return (
    <section className="py-14 bg-cream/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Handcrafted Stitched Cloth Style Certificate */}
        <div className="relative bg-cream p-8 sm:p-12 rounded-lg border-2 border-dashed border-turmeric shadow-xl text-center transition-all duration-300 hover:shadow-2xl">
          
          {/* Top Seal Badge */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-chilli text-cream px-6 py-2 border-2 border-turmeric text-xs uppercase tracking-[0.2em] font-extrabold rounded-full select-none shadow-lg flex items-center gap-2">
            <Award size={15} className="text-turmeric" /> Heirloom Purity Pledge
          </div>
          
          <div className="mt-4 space-y-4 font-sans">
            <h3 className="font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight">
              Purely Stone-Pounded, Honestly Crafted
            </h3>
            
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
              We proudly prepare every single batch without adding <strong className="font-bold text-red-800">artificial food dyes (Sudan Red)</strong>, bulking starches, or chemical preservatives. 
              Only carefully sun-dried Guntur chillies, slow stone-pounding, and ancestral spice recipes are packed into our sealed jars.
            </p>
            
            {/* Clean line divider */}
            <div className="flex items-center justify-center py-2">
              <span className="h-0.5 w-24 bg-amber-500/30 rounded-full" />
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-gray-700 uppercase tracking-wider pt-1">
              <span className="text-green-700 font-bold">Zero Artificial Colors</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-700 font-bold">Low-Heat Stone Milling</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-700 font-bold">48-Hour Fresh Dispatch</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AuthenticityBanner;
