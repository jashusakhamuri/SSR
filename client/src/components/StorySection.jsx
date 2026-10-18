// import React, { useState, useEffect, useRef } from 'react';
// import { Leaf, Sun, Hammer, PackageCheck, Check, X } from 'lucide-react';

// /* Design tokens — black-cotton soil, Sannam crimson, turmeric, chalk */
// const T = {
//   soil: '#1a1512',
//   soil2: '#241d18',
//   crimson: '#c4322a',
//   turmeric: '#e3a72f',
//   chalk: '#efe9df',
//   stone: '#9a9187',
// };
// const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";
// const SERIF = SANS;

// const CHAPTERS = [
//   {
//     label: 'Harvest',
//     title: 'Hand-picked at dawn in Guntur',
//     subtitle: 'Red soils of Andhra Pradesh, 5 AM',
//     image: '/images/story_harvest.jpg',
//     fallback: 'https://images.unsplash.com/photo-1601236800849-c71cf3b6d4e2?auto=format&fit=crop&q=80&w=1200',
//     icon: Leaf,
//     figure: { value: '5 AM', caption: 'First pick, while the pods are still cool' },
//     quote: 'We harvest only at peak crimson maturity. Never early, never forced.',
//     detail:
//       'We work only with Telugu farming families who have grown heirloom Sannam S4 chillies in black-cotton soil for over 80 years. Every pod is chosen by hand.',
//     stats: [
//       ['Variety', 'Guntur Sannam S4'],
//       ['Soil', 'Black cotton alluvial'],
//       ['Harvest', 'Hand-picked'],
//     ],
//     checkpoints: [
//       'Non-hybrid, pesticide-free heirloom chillies',
//       'Pod-by-pod selection, no damaged fruit',
//       'Farmers are paid 30% above market rate',
//     ],
//   },
//   {
//     label: 'Sun-drying',
//     title: 'Cured by the Andhra sun',
//     subtitle: '7–10 days in village courtyards',
//     image: '/images/story_drying.jpg',
//     fallback: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200',
//     icon: Sun,
//     figure: { value: '38°C', caption: 'Natural sunlight, no dryers or ovens' },
//     quote: 'No diesel blowers. No oven chambers. Only solar patience.',
//     detail:
//       'Chillies are spread by hand on handloom cotton sheets. Over 7–10 days the sun dries each pod slowly, deepening the red pigment and keeping the aromatic oils inside the seeds.',
//     stats: [
//       ['Duration', '7–10 days'],
//       ['Heat', 'Natural 38°C'],
//       ['Surface', 'Handloom cotton'],
//     ],
//     checkpoints: [
//       'No artificial heat or industrial dehydrators',
//       'Turned by hand twice a day for even drying',
//       'Sun-curing sets a deep scarlet colour',
//     ],
//   },
//   {
//     label: 'Stone pounding',
//     title: 'Pounded in a granite Rolu',
//     subtitle: 'Slow, cold, in small batches',
//     image: '/images/story_pounding.jpg',
//     fallback: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
//     icon: Hammer,
//     figure: { value: '<35°C', caption: 'Stone stays cool. Steel blades reach 90°C.' },
//     quote: 'Steel scorches what centuries built. Stone keeps it alive.',
//     detail:
//       'We never use high-speed steel pulverizers. Each batch is pounded slowly in a traditional Rolu, which protects the aroma that gives village podi its warmth and bite.',
//     stats: [
//       ['Method', 'Rolu granite mortar'],
//       ['Temperature', 'Below 35°C'],
//       ['Batches', 'Small, artisan'],
//     ],
//     checkpoints: [
//       'Cold pounding keeps the volatile aromatics intact',
//       'Coarse, rustic texture of a grandmother’s recipe',
//       'No heat damage to the natural spice oils',
//     ],
//   },
//   {
//     label: 'Sealed & shipped',
//     title: 'Glass-sealed, dispatched in 48 hours',
//     subtitle: 'From stone mortar to your kitchen',
//     image: '/images/story_packaging.jpg',
//     fallback: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&q=80&w=1200',
//     icon: PackageCheck,
//     figure: { value: '48 h', caption: 'From milling to dispatch' },
//     quote: 'Every jar carries the fingerprints of the hands that pounded it.',
//     detail:
//       'After a hand double-sieve, each batch is weighed and sealed in a food-grade glass jar with a cork lid and jute twine. No anti-caking agents, no starch, no Sudan Red.',
//     stats: [
//       ['Container', 'Glass jar, cork lid'],
//       ['Sudan Red', '0%, guaranteed'],
//       ['Dispatch', 'Within 48 hours'],
//     ],
//     checkpoints: [
//       '100% free from Sudan Red or any artificial dye',
//       'No starch, sawdust or anti-caking fillers',
//       'Sealed the same day it is ground, every batch',
//     ],
//   },
// ];

// /* Generic in-view hook (runs once) */
// function useInView(threshold = 0.3) {
//   const ref = useRef(null);
//   const [seen, setSeen] = useState(false);
//   useEffect(() => {
//     if (!ref.current) return;
//     const obs = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold });
//     obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return [ref, seen];
// }

// function HeatBar({ label, temp, color, show, delay }) {
//   return (
//     <div>
//       <div className="flex justify-between text-sm mb-2" style={{ color: T.chalk }}>
//         <span>{label}</span>
//         <span style={{ fontFamily: SERIF, fontWeight: 600 }}>{temp}°C</span>
//       </div>
//       <div className="h-3 rounded-full" style={{ background: 'rgba(239,233,223,0.1)' }}>
//         <div
//           className="h-3 rounded-full motion-reduce:transition-none"
//           style={{
//             width: show ? `${temp}%` : '0%',
//             background: color,
//             transition: `width 1.2s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// function StorySection() {
//   const [active, setActive] = useState(0);
//   const chapterRefs = useRef([]);
//   const [heatRef, heatSeen] = useInView(0.4);

//   /* Track which chapter is centred in the viewport */
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       (entries) =>
//         entries.forEach((e) => {
//           if (e.isIntersecting) setActive(Number(e.target.dataset.idx));
//         }),
//       { rootMargin: '-45% 0px -45% 0px' }
//     );
//     chapterRefs.current.forEach((el) => el && obs.observe(el));
//     return () => obs.disconnect();
//   }, []);

//   const jump = (i) =>
//     chapterRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

//   const ch = CHAPTERS[active];

//   return (
//     <section id="story" style={{ background: T.soil, color: T.chalk, fontFamily: SANS }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Hanken+Grotesk:wght@400;500;600&family=Noto+Serif+Telugu:wght@600&display=swap');
//         .story-focus:focus-visible{outline:2px solid ${T.turmeric};outline-offset:3px}`}</style>

//       {/* Intro */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-24">
//         <h2
//           className="text-3xl sm:text-5xl lg:text-7xl leading-[1.08] tracking-tight max-w-3xl"
//           style={{ fontFamily: SERIF, fontWeight: 600 }}
//         >
//           Four steps between Guntur soil and your kitchen.
//         </h2>
//         <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: T.stone }}>
//           We don’t skip any of them. Scroll to follow one jar of Guntur chilli powder from the field to your door.
//         </p>
//       </div>

//       {/* Scroll-driven stage */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-x-16">
//         {/* Sticky media */}
//         <div className="lg:col-span-6 sticky top-20 lg:top-0 h-[38vh] sm:h-[46vh] lg:h-screen z-10 flex flex-col justify-center py-2 sm:py-4 lg:py-10"
//              style={{ background: T.soil }}>
//           <div className="relative flex-1 min-h-0 lg:max-h-[72vh] rounded-t-[999px] rounded-b-3xl overflow-hidden mx-auto w-full max-w-[520px]"
//                style={{ background: T.soil2 }}>
//             {CHAPTERS.map((c, i) => (
//               <img
//                 key={c.image}
//                 src={c.image}
//                 alt={c.label}
//                 onError={(e) => { if (e.target.src !== c.fallback) e.target.src = c.fallback; }}
//                 className="absolute inset-0 w-full h-full object-cover motion-reduce:transition-none"
//                 style={{ opacity: active === i ? 1 : 0, transition: 'opacity 700ms ease' }}
//               />
//             ))}
//             <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,21,18,.92) 0%, rgba(26,21,18,0) 55%)' }} />
//             {/* Key figure: the memorable element */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-center" aria-live="polite">
//               <div
//                 key={active}
//                 className="text-4xl sm:text-6xl lg:text-7xl leading-none"
//                 style={{ fontFamily: SERIF, fontWeight: 700, color: T.turmeric }}
//               >
//                 {ch.figure.value}
//               </div>
//               <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm" style={{ color: T.chalk }}>{ch.figure.caption}</p>
//             </div>
//           </div>

//           {/* Step navigation */}
//           <div className="hidden lg:flex justify-center gap-2 mt-5" role="tablist" aria-label="Story steps">
//             {CHAPTERS.map((c, i) => {
//               const on = active === i;
//               return (
//                 <button
//                   key={c.label}
//                   role="tab"
//                   aria-selected={on}
//                   onClick={() => jump(i)}
//                   className="story-focus px-4 py-2 rounded-full text-sm font-medium transition-colors"
//                   style={{
//                     background: on ? T.turmeric : 'transparent',
//                     color: on ? T.soil : T.stone,
//                     border: `1px solid ${on ? T.turmeric : 'rgba(239,233,223,0.2)'}`,
//                   }}
//                 >
//                   {i + 1}. {c.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Scrolling chapters */}
//         <div className="lg:col-span-6">
//           {CHAPTERS.map((c, i) => {
//             const Icon = c.icon;
//             const on = active === i;
//             return (
//               <article
//                 key={c.label}
//                 ref={(el) => (chapterRefs.current[i] = el)}
//                 data-idx={i}
//                 className="relative min-h-[80vh] lg:min-h-screen flex items-center py-12 motion-reduce:transition-none"
//                 style={{ opacity: on ? 1 : 0.35, transition: 'opacity 500ms ease' }}
//               >
//                 <div className="relative space-y-6 max-w-xl">
//                   <div className="flex items-center gap-3" style={{ color: T.turmeric }}>
//                     <Icon size={20} aria-hidden />
//                     <span className="text-sm font-semibold">Step {i + 1} of 4 · {c.label}</span>
//                   </div>
//                   <h3 className="text-4xl sm:text-5xl leading-[1.08]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
//                     {c.title}
//                   </h3>
//                   <p style={{ color: T.stone }}>{c.subtitle}</p>
//                   <p className="text-lg leading-relaxed" style={{ color: 'rgba(239,233,223,0.85)' }}>{c.detail}</p>

//                   <blockquote
//                     className="pl-5 text-xl leading-snug"
//                     style={{ fontFamily: SERIF, borderLeft: `3px solid ${T.crimson}`, fontStyle: 'italic' }}
//                   >
//                     {c.quote}
//                   </blockquote>

//                   <dl className="grid grid-cols-3 gap-4 py-5" style={{ borderTop: '1px solid rgba(239,233,223,0.12)', borderBottom: '1px solid rgba(239,233,223,0.12)' }}>
//                     {c.stats.map(([k, v]) => (
//                       <div key={k}>
//                         <dt className="text-xs mb-1" style={{ color: T.stone }}>{k}</dt>
//                         <dd className="text-sm font-semibold leading-snug">{v}</dd>
//                       </div>
//                     ))}
//                   </dl>

//                   <ul className="space-y-3">
//                     {c.checkpoints.map((p) => (
//                       <li key={p} className="flex gap-3 text-[15px] leading-snug">
//                         <Check size={18} className="shrink-0 mt-0.5" style={{ color: T.turmeric }} aria-hidden />
//                         <span>{p}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       </div>

//       {/* Stone vs steel */}
//       <div className="max-w-5xl mx-auto px-6 py-24 lg:py-32">
//         <h3 className="text-3xl sm:text-5xl leading-tight max-w-2xl" style={{ fontFamily: SERIF, fontWeight: 600 }}>
//           Why stone beats steel
//         </h3>
//         <p className="mt-4 max-w-xl" style={{ color: T.stone }}>
//           Heat is what separates real podi from factory powder. Here is how hot each method runs.
//         </p>

//         <div ref={heatRef} className="mt-12 space-y-6 max-w-2xl">
//           <HeatBar label="Rolu granite mortar (ours)" temp={35} color={T.turmeric} show={heatSeen} delay={0} />
//           <HeatBar label="Industrial steel pulverizer" temp={90} color={T.crimson} show={heatSeen} delay={250} />
//         </div>

//         <div className="mt-14 grid md:grid-cols-2 gap-6">
//           <div className="p-8 rounded-3xl" style={{ background: 'rgba(196,50,42,0.12)', border: '1px solid rgba(196,50,42,0.35)' }}>
//             <h4 className="text-lg mb-5" style={{ fontFamily: SERIF, fontWeight: 600 }}>Industrial pulverizer</h4>
//             <ul className="space-y-4 text-[15px]">
//               {[
//                 ['Friction heat of 90°C+', 'burns off the aromatic oils'],
//                 ['Sudan Red dye', 'hides dull, heat-damaged colour'],
//                 ['Rice flour and starch', 'add weight and dilute the heat'],
//               ].map(([b, r]) => (
//                 <li key={b} className="flex gap-3">
//                   <X size={18} className="shrink-0 mt-0.5" style={{ color: '#f0655c' }} aria-hidden />
//                   <span><strong>{b}</strong> {r}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="p-8 rounded-3xl" style={{ background: 'rgba(227,167,47,0.1)', border: '1px solid rgba(227,167,47,0.4)' }}>
//             <h4 className="text-lg mb-5" style={{ fontFamily: SERIF, fontWeight: 600 }}>Our Rolu granite mortar</h4>
//             <ul className="space-y-4 text-[15px]">
//               {[
//                 ['Cold pounding below 35°C', 'keeps the aroma intact'],
//                 ['Natural crimson', 'comes only from sun-cured Guntur Sannam pods'],
//                 ['No fillers or additives.', 'Just Guntur chillies and toasted spices.'],
//               ].map(([b, r]) => (
//                 <li key={b} className="flex gap-3">
//                   <Check size={18} className="shrink-0 mt-0.5" style={{ color: T.turmeric }} aria-hidden />
//                   <span><strong>{b}</strong> {r}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default StorySection;






import React from 'react';
import { Leaf, Sun, Hammer, PackageCheck, Check } from 'lucide-react';

/* Design tokens: chalk base, Sannam crimson, turmeric, soil */
const T = {
  chalk: '#f4efe6',
  soil: '#1a1512',
  crimson: '#c4322a',
  turmeric: '#f2b33d',
  stone: '#6f675f',
};
const DISPLAY = "'Bricolage Grotesque', system-ui, sans-serif";
const BODY = "'Plus Jakarta Sans', system-ui, sans-serif";

const CHAPTERS = [
  {
    label: 'Harvest',
    alt: 'Farmers hand-picking ripe red Guntur chillies in the early morning',
    title: 'Hand-picked at dawn in Guntur',
    subtitle: 'Red soils of Andhra Pradesh, 5 AM',
    image: '/images/story_harvest.jpg',
    fallback: 'https://images.unsplash.com/photo-1601236800849-c71cf3b6d4e2?auto=format&fit=crop&q=80&w=1400',
    icon: Leaf,
    figure: { value: '5 AM', caption: 'First pick, while the pods are still cool' },
    quote: 'We harvest only at peak crimson maturity. Never early, never forced.',
    detail:
      'We work only with Guntur farming families who have grown heirloom Sannam S4 chillies in black-cotton soil for over 80 years. Every pod is chosen by hand.',
    stats: [
      ['Variety', 'Guntur Sannam S4'],
      ['Soil', 'Black cotton alluvial'],
      ['Harvest', 'Hand-picked'],
    ],
    checkpoints: [
      'Non-hybrid, pesticide-free heirloom chillies',
      'Pod-by-pod selection, no damaged fruit',
      'Farmers are paid 30% above market rate',
    ],
    theme: { bg: '#f2b33d', fg: '#1a1512', mute: 'rgba(26,21,18,0.7)', tile: 'rgba(26,21,18,0.09)', tick: '#1a1512', tickFg: '#f2b33d' },
  },
  {
    label: 'Sun-drying',
    alt: 'Red chillies spread on cotton sheets to dry in the sun',
    title: 'Cured by the Andhra sun',
    subtitle: '7–10 days in village courtyards',
    image: '/images/story_drying.jpg',
    fallback: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1400',
    icon: Sun,
    figure: { value: '38°C', caption: 'Natural sunlight, no dryers or ovens' },
    quote: 'No diesel blowers. No oven chambers. Only solar patience.',
    detail:
      'Chillies are spread by hand on handloom cotton sheets. Over 7–10 days the sun dries each pod slowly, deepening the red pigment and keeping the aromatic oils inside the seeds.',
    stats: [
      ['Duration', '7–10 days'],
      ['Heat', 'Natural 38°C'],
      ['Surface', 'Handloom cotton'],
    ],
    checkpoints: [
      'No artificial heat or industrial dehydrators',
      'Turned by hand twice a day for even drying',
      'Sun-curing sets a deep scarlet colour',
    ],
    theme: { bg: '#c4322a', fg: '#ffffff', mute: 'rgba(255,255,255,0.92)', tile: 'rgba(255,255,255,0.14)', tick: '#f2b33d', tickFg: '#1a1512' },
  },
  {
    label: 'Stone pounding',
    alt: 'Dried chillies being pounded in a granite Rolu mortar',
    title: 'Pounded in a granite Rolu',
    subtitle: 'Slow, cold, in small batches',
    image: '/images/story_pounding.jpg',
    fallback: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1400',
    icon: Hammer,
    figure: { value: '<35°C', caption: 'Stone stays cool. Steel blades reach 90°C.' },
    quote: 'Steel scorches what centuries built. Stone keeps it alive.',
    detail:
    'We never use high-speed steel pulverizers. First we snip the stem off every dried chilli, then each batch is pounded slowly in a traditional Rolu, which protects the aroma that gives village podi its warmth and bite.',
    stats: [
      ['Method', 'Rolu granite mortar'],
      ['Temperature', 'Below 35°C'],
      ['Batches', 'Small, artisan'],
    ],
    checkpoints: [
      'Cold pounding keeps the volatile aromatics intact',
      'Coarse, rustic texture of a grandmother’s recipe',
      'No heat damage to the natural spice oils',
    ],
    theme: { bg: '#1a1512', fg: '#f4efe6', mute: '#a39a8e', tile: 'rgba(244,239,230,0.08)', tick: '#f2b33d', tickFg: '#1a1512' },
  },
  {
    label: 'Sealed & shipped',
    alt: 'Chilli powder sealed in glass jars with cork lids',
    title: 'Glass-sealed, dispatched in 48 hours',
    subtitle: 'From stone mortar to your kitchen',
    image: '/images/story_packaging.jpg',
    fallback: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&q=80&w=1400',
    icon: PackageCheck,
    figure: { value: '48 h', caption: 'From milling to dispatch' },
    quote: 'Every jar carries the fingerprints of the hands that pounded it.',
    detail:
      'After a hand double-sieve, each batch is weighed and sealed in a food-grade glass jar with a cork lid and jute twine. No anti-caking agents, no starch, no Sudan Red.',
    stats: [
      ['Container', 'Glass jar, cork lid'],
      ['Sudan Red', '0%, guaranteed'],
      ['Dispatch', 'Within 48 hours'],
    ],
    checkpoints: [
      '100% free from Sudan Red or any artificial dye',
      'No starch, sawdust or anti-caking fillers',
      'Sealed the same day it is ground, every batch',
    ],
    theme: { bg: '#fffaf0', fg: '#1a1512', mute: '#6f675f', tile: 'rgba(26,21,18,0.05)', tick: '#c4322a', tickFg: '#ffffff' },
  },
];

/* Image with the local file first, remote fallback second */
function Photo({ c, className = '', style, eager }) {
  return (
    <img
      src={c.image}
      alt={c.alt || c.label}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      onError={(e) => { if (e.target.src !== c.fallback) e.target.src = c.fallback; }}
      className={`w-full h-full object-cover ${className}`}
      style={style}
    />
  );
}

const glass = {
  background: 'rgba(20,15,12,0.42)',
  border: '1px solid rgba(255,255,255,0.22)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
};

function StoryCard({ c, i }) {
  const Icon = c.icon;
  const th = c.theme;
  return (
    <article
      id={`story-step-${i + 1}`}
      className="scroll-mt-24 lg:sticky mb-5 lg:mb-[14vh] rounded-[20px] p-3 sm:p-4 grid lg:grid-cols-12 gap-3 lg:gap-6 lg:min-h-[640px]"
      style={{
        background: th.bg,
        color: th.fg,
        top: `${88 + i * 14}px`,
        boxShadow: '0 -20px 60px -30px rgba(0,0,0,0.35), 0 30px 70px -40px rgba(0,0,0,0.5)',
      }}
    >
      {/* Image panel */}
      <div className="lg:col-span-6 relative overflow-hidden rounded-[14px] min-h-[360px] sm:min-h-[460px] bg-black/20">
        <Photo c={c} eager={i === 0} />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(15,11,9,.82) 0%, rgba(15,11,9,.1) 55%, rgba(15,11,9,.25) 100%)' }}
        />

        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full text-sm font-semibold text-white" style={glass}>
          <span className="grid place-items-center w-7 h-7 rounded-full" style={{ background: T.turmeric, color: T.soil }}>
            <Icon size={15} aria-hidden />
          </span>
          {c.label}
        </div>
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 px-3.5 py-2 rounded-full text-sm font-semibold text-white tabular-nums" style={glass}>
          {i + 1} / 4
        </div>

        <div className="absolute left-3 right-3 bottom-3 sm:left-5 sm:right-5 sm:bottom-5 text-white">
          <div
            className="text-6xl sm:text-8xl leading-[0.88] tracking-[-0.045em]"
            style={{ fontFamily: DISPLAY, fontWeight: 800 }}
          >
            {c.figure.value}
          </div>
          <p className="mt-2 mb-4 text-sm sm:text-base max-w-sm" style={{ opacity: 0.92 }}>{c.figure.caption}</p>
          <blockquote
            className="rounded-xl px-4 py-3.5 sm:px-5 sm:py-4 text-base sm:text-lg leading-snug"
            style={{ ...glass, fontFamily: DISPLAY, fontWeight: 600 }}
          >
            {c.quote}
          </blockquote>
        </div>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-6 flex flex-col justify-center gap-6 p-3 sm:p-6 lg:py-8 lg:pr-8 lg:pl-2">
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: th.mute }}>{c.subtitle}</p>
          <h3
            className="text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1] tracking-[-0.035em]"
            style={{ fontFamily: DISPLAY, fontWeight: 700 }}
          >
            {c.title}
          </h3>
        </div>

        <p className="text-base sm:text-[17px] leading-relaxed" style={{ color: th.mute }}>{c.detail}</p>

        <dl className="grid grid-cols-3 gap-2 sm:gap-3">
          {c.stats.map(([k, v]) => (
            <div key={k} className="rounded-xl p-3.5 sm:p-4" style={{ background: th.tile }}>
              <dt className="text-xs mb-1.5" style={{ color: th.mute }}>{k}</dt>
              <dd className="text-sm font-bold leading-snug">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="space-y-2.5">
          {c.checkpoints.map((p) => (
            <li key={p} className="flex items-center gap-3 rounded-full pl-2 pr-5 py-2 text-sm sm:text-[15px] font-medium leading-snug" style={{ background: th.tile }}>
              <span className="grid place-items-center shrink-0 w-6 h-6 rounded-full" style={{ background: th.tick, color: th.tickFg }}>
                <Check size={14} strokeWidth={3} aria-hidden />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function StorySection({ ctaHref = '/products', ctaLabel = 'Pick your favorite' }) {
  return (
    <section id="story" aria-labelledby="story-heading" style={{ background: T.chalk, color: T.soil, fontFamily: BODY }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@700&display=swap');
        .story-focus:focus-visible{outline:2px solid ${T.crimson};outline-offset:3px}
        @keyframes story-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .story-marquee{animation:story-marquee 60s linear infinite}
        @media (prefers-reduced-motion: reduce){.story-marquee{animation:none}}`}</style>

      {/* Hero: headline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32 pb-10 sm:pb-14">
        <div className="grid lg:grid-cols-12 gap-6 items-end">
          <h2
            id="story-heading"
            className="lg:col-span-8 text-[2.7rem] sm:text-6xl lg:text-[5.6rem] leading-[0.95] tracking-[-0.04em]"
            style={{ fontFamily: DISPLAY, fontWeight: 800 }}
          >
            Four steps between Guntur soil and your kitchen.
          </h2>
          <p className="lg:col-span-4 text-base sm:text-lg leading-relaxed" style={{ color: T.stone }}>
            We don’t skip any of them. Scroll to follow one jar of Guntur chilli powder from the field to your door.
          </p>
        </div>
      </div>

      {/* Stacking story cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10">
        {CHAPTERS.map((c, i) => (
          <StoryCard key={c.label} c={c} i={i} />
        ))}
      </div>

      {/* Finale: the land of mirchi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-24">
      <div
        className="relative overflow-hidden rounded-[20px] flex flex-col justify-between min-h-[340px] sm:min-h-[380px]"
        style={{ background: T.soil, color: '#fff', boxShadow: '0 30px 70px -40px rgba(0,0,0,0.5)' }}
      >
        <div className="absolute inset-0" aria-hidden>
          <Photo c={CHAPTERS[1]} />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(20,10,8,.94) 8%, rgba(120,24,18,.55) 55%, rgba(20,10,8,.35) 100%)' }}
          />
        </div>

        {/* Slow Telugu / English band */}
        <div className="relative pt-5 sm:pt-6 overflow-hidden select-none" aria-hidden>
          <div className="story-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center gap-8 pr-8 text-4xl sm:text-6xl leading-none" style={{ color: 'rgba(243,237,226,0.16)' }}>
                {[0, 1, 2, 3].map((n) => (
                  <React.Fragment key={n}>
                    <span style={{ fontFamily: "'Noto Sans Telugu', sans-serif", fontWeight: 700 }}>మిర్చి</span>
                    <span style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: '-0.04em' }}>Mirchi</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full px-5 sm:px-8 pt-8 pb-6 sm:pb-8">
          <h3
            className="text-4xl sm:text-5xl lg:text-6xl leading-[1] tracking-[-0.035em]"
            style={{ fontFamily: DISPLAY, fontWeight: 800 }}
          >
            The land of mirchi.
          </h3>
          <div className="mt-4 sm:mt-5 grid lg:grid-cols-12 gap-5 items-end">
            <p className="lg:col-span-6 text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Red soil, hot sun and families who have grown chillies here for over 80 years. Every jar we seal starts in Guntur.
            </p>
            <div className="lg:col-span-6 lg:justify-self-end flex flex-col gap-3 lg:items-end">
              <a
                href={ctaHref}
                className="story-focus inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] motion-reduce:transition-none"
                style={{ background: T.turmeric, color: T.soil }}
              >
                {ctaLabel}
              </a>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {['No Sudan Red', 'No starch', 'No sawdust', 'No artificial dye'].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check size={13} strokeWidth={3} style={{ color: T.turmeric }} aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default StorySection;