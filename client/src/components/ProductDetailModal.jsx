import { X, CheckCircle, ShieldCheck, Flame, BookOpen, ShoppingCart, Compass, Hammer } from 'lucide-react';

function ProductDetailModal({ product, onClose, onAddToCart, onBuy }) {
  if (!product) return null;

  // Detail contents customized based on product
  const getProductDetails = (id) => {
    if (id === 1) {
      // Masala Karam Details
      return {
        origin: "Grown in the black cotton soils of Guntur, Andhra Pradesh. We source chillies directly from local marginal farmers who practice traditional crop rotation.",
        method: "The chillies are hand-harvested, destemmed, and sun-dried on clean handloom cotton sheets for 7 days. They are then slowly blended with roasted spices in a traditional stone mortar grinder (Rolu) to maintain natural warmth and volatile oils.",
        recipes: [
          { name: "Andhra Pappu (Lentil Curry)", desc: "Add 1 tbsp of Masala Karam to boiled pigeon peas (toor dal) with ghee and lemon juice for an authentic spicy Andhra lunch." },
          { name: "Crispy Potato Fry", desc: "Toss potato cubes with salt, turmeric, and 1.5 tbsp of Masala Karam during the last 5 minutes of roasting." }
        ],
        storage: "Keep in a cool, dry place inside an airtight glass or ceramic jar. Avoid using wet spoons to prevent mold formation.",
        faqs: [
          { q: "Is it very spicy?", a: "It has a medium heat (3/5) balanced beautifully by aromatic coriander and cumin. Ideal for daily cooking." },
          { q: "Does it contain garlic?", a: "Yes, this traditional recipe includes fresh garlic cloves for rich aroma and immune support." }
        ]
      };
    } else {
      // Goddu Karam Details
      return {
        origin: "Harvested from the premium selection of Guntur Sannam (S4) chillies, famous worldwide for their intense heat and rich dark red color.",
        method: "No stems are included. Dried slowly under hot sun until crisp. The pods are stone-pounded at low temperatures. Low temperature stone pounding prevents the loss of Capsaicin (the compound that gives chili its heat).",
        recipes: [
          { name: "Traditional Chicken Curry", desc: "Use 2 tsp of Goddu Karam to get a fiery, deep-red traditional Andhra chicken curry that pairs beautifully with steamed rice." },
          { name: "Homemade Pickle Base", desc: "Excellent base for making mango, tomato, or lime pickles, providing both sharp pungency and deep coloring." }
        ],
        storage: "Store in a dark cupboard in an airtight container. Sunlight can fade the natural red color over time.",
        faqs: [
          { q: "Is there any added oil or color?", a: "Absolutely not. The deep red color and sheen come purely from the natural oils of Guntur Sannam chillies." },
          { q: "How long does the heat last?", a: "Since it is freshly stone-pounded on order, the capsaicin oils stay potent for up to 9 months." }
        ]
      };
    }
  };

  const details = getProductDetails(product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-earth-dark/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-cream max-w-3xl w-full rounded-sm border-2 border-turmeric shadow-2xl overflow-hidden z-10 animate-fade-in max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-earth text-cream p-5 flex items-center justify-between border-b border-turmeric font-sans">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl text-white tracking-wide">{product.name} Details</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-cream/70 hover:text-cream hover:bg-cream/10 p-1.5 rounded-full transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 max-h-[70vh]">
          
          {/* Top Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full aspect-[4/3] object-cover rounded-sm border border-earth/10 shadow-sm"
                onError={(e) => {
                  e.target.src = '/images/masala_karam.png';
                }}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-earth/10 pb-2">
                <span className="font-semibold text-earth">Pack Price:</span>
                <span className="font-sans font-extrabold text-2xl text-chilli">₹{parseFloat(product.price).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-baseline border-b border-earth/10 pb-2">
                <span className="font-semibold text-earth">Quantity:</span>
                <span className="text-earth-light text-sm font-semibold">{product.weight} Net Wt</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-leaf text-xs font-semibold">
                  <CheckCircle size={16} className="text-leaf" /> No Artificial Food Colors
                </div>
                <div className="flex items-center gap-2 text-leaf text-xs font-semibold">
                  <CheckCircle size={16} className="text-leaf" /> 100% Preservative Free
                </div>
                <div className="flex items-center gap-2 text-leaf text-xs font-semibold">
                  <CheckCircle size={16} className="text-leaf" /> Freshly Ground on Order
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button 
                  onClick={() => {
                    onAddToCart(product);
                  }}
                  className="flex-1 bg-turmeric hover:bg-turmeric-dark text-earth-dark font-bold py-3 rounded-sm text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart size={15} /> Add to Cart
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    onBuy(product);
                  }}
                  className="flex-1 bg-chilli hover:bg-chilli-dark text-cream font-bold py-3 rounded-sm text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>

          {/* Product Story */}
          <div className="space-y-3">
            <h3 className="font-sans font-bold text-lg text-earth border-b border-dashed border-earth/20 pb-1.5 flex items-center gap-2">
              <Compass size={18} className="text-chilli" /> Origin Story & Sourcing
            </h3>
            <p className="text-earth-light text-sm leading-relaxed font-light">{details.origin}</p>
          </div>

          {/* Processing Method */}
          <div className="space-y-3">
            <h3 className="font-sans font-bold text-lg text-earth border-b border-dashed border-earth/20 pb-1.5 flex items-center gap-2">
              <Hammer size={18} className="text-turmeric-dark" /> Traditional Processing Method
            </h3>
            <p className="text-earth-light text-sm leading-relaxed font-light">{details.method}</p>
          </div>

          {/* Recipes */}
          <div className="space-y-3">
            <h3 className="font-sans font-bold text-lg text-earth border-b border-dashed border-earth/20 pb-1.5 flex items-center gap-2">
              <BookOpen size={18} className="text-chilli" /> Recommended Recipes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.recipes.map((recipe, idx) => (
                <div key={idx} className="bg-earth/5 p-4 rounded-sm border border-earth/10">
                  <h4 className="font-bold text-earth text-sm mb-1">{recipe.name}</h4>
                  <p className="text-earth-light text-xs font-light leading-relaxed">{recipe.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs & Storage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            <div className="space-y-3">
              <h3 className="font-bold text-base text-gray-900 border-b border-gray-200 pb-1.5 uppercase tracking-wider">
                Storage Instructions
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed font-normal">{details.storage}</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-base text-gray-900 border-b border-gray-200 pb-1.5 uppercase tracking-wider">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {details.faqs.map((faq, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-earth">Q: {faq.q}</p>
                    <p className="text-earth-light font-light mt-0.5">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-cream-dark p-4 border-t border-earth/10 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-earth text-cream hover:bg-earth-dark px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors duration-200"
          >
            Close Booklet
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailModal;
