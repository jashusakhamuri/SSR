import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight, Plus, Minus } from 'lucide-react';

/**
 * CartDrawer — A compact "mini-cart" preview panel that slides in from the right.
 * Clicking "Proceed to Checkout" navigates the user to the full /cart page.
 */
function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleGoToCart = () => {
    onClose();
    window.navigateTo('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-in panel — narrower preview only */}
      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col border-l border-gray-200">

          {/* Header */}
          <div className="bg-gray-900 text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-amber-400" size={20} />
              <div>
                <h2 className="font-sans font-bold text-lg text-white leading-none">Cart Preview</h2>
                <span className="text-[11px] text-gray-300 uppercase tracking-widest font-semibold mt-0.5 block">
                  {totalItemCount} item{totalItemCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingCart size={32} />
                </div>
                <h4 className="font-sans font-bold text-xl text-gray-900">Cart is Empty</h4>
                <p className="text-gray-500 text-xs">Add spices from our collection.</p>
                <button
                  onClick={() => { onClose(); window.navigateTo('/products'); }}
                  className="bg-red-800 text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-wider shadow-md"
                >
                  Shop Spices
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-xl border border-gray-200 flex-shrink-0"
                    onError={(e) => { e.target.src = '/images/masala_karam.png'; }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-gray-900 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500">₹{item.price} / {item.weight}</p>

                    {/* + / - Controls */}
                    <div className="flex items-center border border-gray-300 rounded-full bg-white w-fit mt-1.5 shadow-xs">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1 text-gray-700 hover:bg-gray-100 rounded-l-full">
                        <Minus size={11} />
                      </button>
                      <span className="px-3 py-1 text-xs font-extrabold text-gray-900">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1 text-gray-700 hover:bg-gray-100 rounded-r-full">
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right space-y-1.5">
                    <span className="font-sans font-extrabold text-base sm:text-lg text-red-800 block">₹{(item.price * item.quantity).toFixed(0)}</span>
                    <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-700 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="bg-gray-50 p-5 border-t border-gray-200 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-normal">Subtotal ({totalItemCount} items)</span>
                <span className="font-sans font-extrabold text-xl text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleGoToCart}
                className="w-full bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold py-4 rounded-full text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                Proceed to Cart & Checkout <ArrowRight size={15} />
              </button>

              <button onClick={onClose} className="w-full text-xs text-gray-500 hover:text-gray-800 font-semibold text-center transition-colors">
                ← Continue Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
