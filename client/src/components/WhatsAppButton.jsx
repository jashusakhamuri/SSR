import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WA_NUMBER = '919014119415'; // Sakhamuri Jaswanth WhatsApp Ordering
const WA_MESSAGE = encodeURIComponent('Hello! I visited SSR Mirchi Store and would like to place an order. Can you help me?');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 3000);
    const t2 = setTimeout(() => setTooltip(false), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {tooltip && (
        <div className="relative bg-white text-earth text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-earth/10 max-w-[200px] text-right animate-fade-in-up">
          <button
            onClick={() => setTooltip(false)}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-earth/20 rounded-full flex items-center justify-center text-earth hover:bg-earth/40 transition-colors"
          >
            <X size={9} />
          </button>
          <p className="leading-snug">
            💬 Order via WhatsApp<br />
            <span className="text-leaf font-bold">We reply fast!</span>
          </p>
          <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-white border-r border-b border-earth/10 rotate-45" />
        </div>
      )}

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
        title="Chat on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: '#25D366' }} />
        <MessageCircle size={26} className="text-white fill-white relative z-10" />
      </a>
    </div>
  );
}

export default WhatsAppButton;
