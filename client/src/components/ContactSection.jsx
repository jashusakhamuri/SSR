import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';
import { submitContact } from '../services/api';

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Valid email is required';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message cannot be empty';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await submitContact(formData);
      if (result && result.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Contact submit failed', err);
      alert('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-cream-dark/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-chilli font-bold text-xs uppercase tracking-widest block">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-cormorant font-bold text-earth tracking-wide">Connect With Our Spicery</h2>
          <p className="text-earth-light text-xs sm:text-sm font-light">
            Have questions about bulk orders, international shipping rates, or recipe suggestions? Write to us directly or visit our office.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Box */}
            <div className="bg-cream p-6 rounded-sm border border-earth/10 shadow-sm space-y-4">
              <h3 className="font-sans font-bold text-xl text-chilli border-b border-earth/10 pb-2">Store Details</h3>
              <div className="space-y-4 text-xs sm:text-sm text-gray-700 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Address:</strong> <br />
                    Kopparru Village, Guntur District, Andhra Pradesh, 522015, India
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-green-600 shrink-0" />
                  <div>
                    <strong>Phone / WhatsApp:</strong> <br />
                    <a href="https://wa.me/919014119415" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                      +91 90141 19415 (WhatsApp Chat)
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-600 shrink-0" />
                  <div>
                    <strong>Email:</strong> <br />
                    <a href="mailto:sjaswanthconnect@gmail.com" className="hover:text-red-600 transition-colors">
                      sjaswanthconnect@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-turmeric shrink-0 mt-0.5" />
                <div>
                  <strong>Business Hours:</strong> <br />
                  Monday – Saturday: 9:00 AM – 6:00 PM (IST) <br />
                  <span className="italic text-earth-light text-xs">Closed on Sundays & Indian Public Holidays</span>
                </div>
              </div>
            </div>
            {/* Map Mockup */}
            <div className="rounded-sm overflow-hidden border border-earth/10 shadow-sm h-48 bg-earth-beige relative flex items-center justify-center text-center p-4">
              <div className="absolute inset-0 bg-handloom opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-earth/5 to-transparent"></div>
              <div className="relative z-10 space-y-2">
                <MapPin size={32} className="text-chilli mx-auto animate-bounce" />
                <h4 className="font-cormorant font-bold text-lg text-earth">Our Grinding Center Map</h4>
                <p className="text-[10px] text-earth-light max-w-xs font-light">
                  Grandmother's Farm, Guntur District, Andhra Pradesh, India.
                </p>
                <div className="inline-block bg-earth text-cream px-3 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider shadow-sm select-none">
                  Stone Grinding Unit
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="lg:col-span-7">
            <div className="bg-cream p-8 rounded-sm border-stitched shadow-md">
              {success ? (
                <div className="text-center py-16 text-leaf space-y-3">
                  <div className="w-12 h-12 bg-leaf/10 border border-leaf rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="font-cormorant font-bold text-2xl text-earth">Message Sent!</h3>
                  <p className="text-xs text-earth-light font-light max-w-xs mx-auto">
                    Thank you for reaching out. Our spice counselors will respond to your email within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-cormorant font-bold text-2xl text-chilli border-b border-earth/10 pb-3 flex items-center gap-2">
                    <HelpCircle size={22} /> Send Us A Message
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-earth uppercase tracking-wider mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-cream-light border ${errors.name ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                        placeholder="Enter name"
                      />
                      {errors.name && <p className="text-[10px] text-chilli mt-0.5 font-semibold">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-earth uppercase tracking-wider mb-1">Phone Number (Optional)</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-cream-light border border-earth/20 focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-earth uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-cream-light border ${errors.email ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                        placeholder="customer@domain.com"
                      />
                      {errors.email && <p className="text-[10px] text-chilli mt-0.5 font-semibold">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-earth uppercase tracking-wider mb-1">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-cream-light border ${errors.message ? 'border-chilli' : 'border-earth/20'} focus:border-chilli rounded-xs p-2.5 text-xs text-earth focus:outline-none`}
                      placeholder="Write your questions or feedback..."
                    ></textarea>
                    {errors.message && <p className="text-[10px] text-chilli mt-0.5 font-semibold">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-chilli hover:bg-chilli-dark text-cream font-bold py-3.5 px-8 rounded-sm text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all w-full"
                  >
                    <Send size={14} /> {loading ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
