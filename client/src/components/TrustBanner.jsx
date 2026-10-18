import React from 'react';
import { Droplet, ShieldCheck, Hammer, Sparkles, Heart } from 'lucide-react';

function TrustBanner() {
  const trustItems = [
    {
      icon: <Droplet className="w-6 h-6 text-chilli-light" />,
      title: "No Artificial Dyes",
      desc: "100% genuine capsaicin red",
      badge: "Pure Color"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-leaf-light" />,
      title: "Zero Preservatives",
      desc: "No anti-caking or starch fillers",
      badge: "Chemical-Free"
    },
    {
      icon: <Hammer className="w-6 h-6 text-turmeric" />,
      title: "Cold Stone-Pounded",
      desc: "Low-heat Rolu mortar grind",
      badge: "Aroma Locked"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-turmeric-light" />,
      title: "Guntur S4 Heirloom",
      desc: "Hand-harvested pods only",
      badge: "Single-Origin"
    },
    {
      icon: <Heart className="w-6 h-6 text-chilli" />,
      title: "Farmer Direct Trade",
      desc: "Empowering Andhra rural families",
      badge: "Fair Price"
    }
  ];

  return (
    <section className="bg-earth text-cream py-10 border-y-4 border-turmeric shadow-2xl relative overflow-hidden">
      
      {/* Background subtle weave */}
      <div className="absolute inset-0 bg-handloom opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 text-center">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center p-4 bg-cream/5 rounded-lg border border-cream/10 transition-all duration-300 hover:bg-cream/10 hover:border-turmeric/50 hover:transform hover:-translate-y-1 ${
                index === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="p-3 bg-cream/10 rounded-full mb-3 flex items-center justify-center border border-turmeric/30 shadow-inner">
                {item.icon}
              </div>
              <span className="text-[9px] text-turmeric uppercase tracking-widest font-extrabold mb-1">
                {item.badge}
              </span>
              <h3 className="font-sans font-bold text-base sm:text-lg text-cream tracking-wide leading-tight">
                {item.title}
              </h3>
              <p className="text-[11px] text-cream/70 mt-1 font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBanner;
