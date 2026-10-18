import React from 'react';

// Lightweight absolute elements that float upwards slowly in the background
function FloatingSpices() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Chilli Particle */}
      <div className="absolute left-[8%] top-[120%] animate-float-1 text-chilli/10" style={{ animationDelay: '0s' }}>
        <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
          <path d="M19.5,3C19,3 18.5,3.2 18.1,3.6L16.2,5.5C14.8,4.6 13,4 11,4C6.6,4 3,7.6 3,12C3,13 3.2,14 3.6,15L2.1,20.5C2,20.8 2.1,21.1 2.3,21.3C2.5,21.5 2.7,21.6 3,21.6L3.5,21.6L9,20.1C10,20.5 11,20.7 12,20.7C16.4,20.7 20,17.1 20,12.7C20,10.7 19.4,8.9 18.5,7.5L20.4,5.6C21,5 21,4 20.4,3.4C20.1,3.1 19.8,3 19.5,3M12,18.7C8.7,18.7 6,16 6,12.7C6,11.7 6.2,10.8 6.7,10L14,17.3C13.2,18.2 12.3,18.7 12,18.7M16.5,15.6L9.2,8.3C10,7.8 11,7.6 12,7.6C15.3,7.6 18,10.3 18,13.6C18,14.6 17.5,15.1 16.5,15.6Z"/>
        </svg>
      </div>

      {/* Spice Leaf */}
      <div className="absolute left-[85%] top-[140%] animate-float-2 text-leaf/10" style={{ animationDelay: '5s' }}>
        <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34C5.71,19.3 11,14 17,14C19,14 20,13 20,12C20,11 19,8 17,8M12,2C4,4 3,11 3,12C3,13 4,14 6,14C14,12 15,6 18,4C16,2 14,2 12,2Z"/>
        </svg>
      </div>

      {/* Cumin Seed (Oval dot) */}
      <div className="absolute left-[25%] top-[160%] animate-float-2 text-earth/10" style={{ animationDelay: '12s' }}>
        <svg className="w-6 h-6 fill-current animate-pulse" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(35 12 12)" />
        </svg>
      </div>

      {/* Star Anise */}
      <div className="absolute left-[70%] top-[110%] animate-float-1 text-turmeric/10" style={{ animationDelay: '8s' }}>
        <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
          <path d="M12,2L14.3,6.7L19.5,7.5L15.7,11.2L16.6,16.4L12,14L7.4,16.4L8.3,11.2L4.5,7.5L9.7,6.7L12,2Z"/>
        </svg>
      </div>

      {/* Another Chilli */}
      <div className="absolute left-[45%] top-[180%] animate-float-1 text-chilli/10" style={{ animationDelay: '18s' }}>
        <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
          <path d="M19.5,3C19,3 18.5,3.2 18.1,3.6L16.2,5.5C14.8,4.6 13,4 11,4C6.6,4 3,7.6 3,12C3,13 3.2,14 3.6,15L2.1,20.5C2,20.8 2.1,21.1 2.3,21.3C2.5,21.5 2.7,21.6 3,21.6L3.5,21.6L9,20.1C10,20.5 11,20.7 12,20.7C16.4,20.7 20,17.1 20,12.7C20,10.7 19.4,8.9 18.5,7.5L20.4,5.6C21,5 21,4 20.4,3.4C20.1,3.1 19.8,3 19.5,3Z"/>
        </svg>
      </div>

      {/* Additional Leaf */}
      <div className="absolute left-[92%] top-[115%] animate-float-2 text-leaf/10" style={{ animationDelay: '22s' }}>
        <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34C5.71,19.3 11,14 17,14C19,14 20,13 20,12C20,11 19,8 17,8M12,2C4,4 3,11 3,12C3,13 4,14 6,14C14,12 15,6 18,4C16,2 14,2 12,2Z"/>
        </svg>
      </div>
    </div>
  );
}

export default FloatingSpices;
