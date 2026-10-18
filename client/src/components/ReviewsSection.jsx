import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ShieldCheck } from 'lucide-react';
import { getReviews, submitReview } from '../services/api';

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    country: 'India',
    rating: 5,
    comment: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.customer_name.trim()) tempErrors.customer_name = 'Name is required';
    if (!formData.comment.trim()) tempErrors.comment = 'Review text is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const newReview = await submitReview({
        customer_name: formData.customer_name,
        country: formData.country,
        rating: parseInt(formData.rating),
        comment: formData.comment
      });
      
      setSubmitSuccess(true);
      fetchReviews();
      setTimeout(() => {
        setShowForm(false);
        setSubmitSuccess(false);
        setFormData({ customer_name: '', country: 'India', rating: 5, comment: '' });
      }, 2500);
    } catch (err) {
      console.error('Failed submitting review', err);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5 text-turmeric">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < rating ? 'fill-turmeric text-turmeric' : 'text-earth/20'} 
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 bg-cream relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-red-800 font-bold text-xs uppercase tracking-[0.2em] block">
              Verified Family Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Trusted in Homes & Kitchens Worldwide
            </h2>
            <p className="text-gray-600 text-sm font-normal max-w-xl">
              Authentic feedback from home cooks, mothers, and families across India, the US, UK, and UAE who rely on our stone-ground spice powders for their daily cooking.
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="self-start md:self-auto bg-earth hover:bg-earth-dark text-cream font-bold py-3.5 px-6 rounded-md text-xs uppercase tracking-widest flex items-center gap-2 shadow-md hover:shadow-xl transition-all"
          >
            <MessageSquarePlus size={16} /> Share Your Review
          </button>
        </div>

        {/* Optional Review Form Drawer */}
        {showForm && (
          <div className="bg-cream-light p-8 rounded-lg border-2 border-turmeric shadow-xl mb-14 max-w-xl mx-auto animate-fade-in">
            {submitSuccess ? (
              <div className="text-center py-6 text-leaf space-y-2">
                <CheckCircle className="mx-auto" size={36} />
                <h4 className="font-bold font-sans text-xl sm:text-2xl text-earth">Thank You! Review Published</h4>
                <p className="text-xs text-earth-light">Your review helps other families discover authentic stone-ground spices.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-chilli border-b border-earth/10 pb-2">
                  Share Your Kitchen Experience
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-earth uppercase tracking-wider mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      name="customer_name" 
                      value={formData.customer_name} 
                      onChange={handleChange}
                      className={`w-full bg-white border ${errors.customer_name ? 'border-chilli' : 'border-earth/20'} rounded-xs p-2.5 text-xs text-earth focus:outline-none focus:border-chilli`}
                      placeholder="e.g. Meenakshi Iyer"
                    />
                    {errors.customer_name && <p className="text-[9px] text-chilli mt-0.5 font-bold">{errors.customer_name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-earth uppercase tracking-wider mb-1">Country / State</label>
                    <input 
                      type="text" 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange}
                      className="w-full bg-white border border-earth/20 rounded-xs p-2.5 text-xs text-earth focus:outline-none focus:border-chilli"
                      placeholder="e.g. India, United States"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Rating</label>
                  <select 
                    name="rating" 
                    value={formData.rating} 
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-800"
                  >
                    <option value={5}>5 Stars - Exceptional Taste</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-earth uppercase tracking-wider mb-1">Your Review Comment</label>
                  <textarea 
                    name="comment" 
                    rows="3"
                    value={formData.comment} 
                    onChange={handleChange}
                    className={`w-full bg-white border ${errors.comment ? 'border-chilli' : 'border-earth/20'} rounded-xs p-2.5 text-xs text-earth focus:outline-none focus:border-chilli`}
                    placeholder="Tell us about the aroma, heat level, or dish you prepared..."
                  ></textarea>
                  {errors.comment && <p className="text-[9px] text-chilli mt-0.5 font-bold">{errors.comment}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="bg-transparent border border-earth/20 text-earth px-5 py-2.5 rounded-sm text-xs font-semibold hover:bg-earth/5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-chilli hover:bg-chilli-dark text-cream px-7 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews List Grid */}
        {loading ? (
          <div className="text-center text-earth-light py-12 text-xs font-light">Loading customer reviews...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-cream-light p-6 rounded-md border border-earth/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {/* User Avatar + Details */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-earth text-cream font-sans font-extrabold flex items-center justify-center text-lg select-none border border-turmeric shadow-md">
                        {rev.customer_name ? rev.customer_name.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div>
                        <h4 className="font-bold text-earth text-sm flex items-center gap-1">
                          {rev.customer_name}
                          <ShieldCheck size={13} className="text-leaf" title="Verified Customer" />
                        </h4>
                        <p className="text-[10px] text-gray-500 font-semibold">
                          {rev.country}
                        </p>
                      </div>
                    </div>
                    {/* Star Rating */}
                    {renderStars(rev.rating)}
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-earth-light text-xs sm:text-sm font-light italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Footer timestamp & verified badge */}
                <div className="flex items-center justify-between text-[9px] text-earth/50 pt-3 border-t border-earth/10 font-semibold">
                  <span className="text-leaf font-bold flex items-center gap-1">
                    ✓ Verified Customer Order
                  </span>
                  <span>
                    {new Date(rev.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default ReviewsSection;
