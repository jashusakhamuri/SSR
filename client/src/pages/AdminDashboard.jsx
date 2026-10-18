import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import { ArrowLeft, RefreshCw, IndianRupee, ShoppingBag, Globe, Star, LogOut, Loader2 } from 'lucide-react';

function AdminDashboard({ navigate, onLogout }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setRefreshing(true);
    try {
      const result = await getDashboardStats();
      if (result && result.success) {
        setStats(result.stats);
      }
    } catch (err) {
      console.error('Failed to load dashboard statistics', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center font-sans text-earth">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-red-800 mx-auto" size={32} />
          <p className="text-sm font-semibold uppercase tracking-widest text-earth/60">Loading Dashboard Data...</p>
        </div>
      </div>
    );
  }

  // Derived stats
  const averageOrderValue = stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : 0;
  const maxRevenue = stats.countryDistribution && stats.countryDistribution.length > 0 
    ? Math.max(...stats.countryDistribution.map(c => parseFloat(c.revenue)))
    : 1;

  return (
    <div className="min-h-screen bg-cream-light py-8 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header Panel */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-earth/10 pb-6">
        <div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs font-bold text-chilli hover:text-chilli-dark uppercase tracking-widest mb-2 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Store
          </button>
          <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-earth tracking-tight flex items-center gap-2.5">
            <img
              src="/images/ssr_logo_icon.jpg"
              alt="SSR"
              className="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-red-800/20"
            />
            <span>SSR Store — Administrator Console</span>
          </h1>
          <p className="text-xs text-earth-light font-normal mt-0.5">Real-time metrics, shipping volumes, and customer ratings.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadStats}
            disabled={refreshing}
            className="bg-earth hover:bg-earth-dark text-cream font-bold py-2.5 px-4 rounded-sm text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={onLogout}
            className="bg-chilli hover:bg-chilli-dark text-cream font-bold py-2.5 px-4 rounded-sm text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Core Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Card: Total Revenue */}
          <div className="bg-cream p-6 rounded-sm border border-earth/10 shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-earth/50 uppercase tracking-widest block">Total Revenue</span>
              <span className="text-3xl font-bold text-chilli">₹{parseFloat(stats.totalRevenue).toFixed(2)}</span>
              <span className="text-[10px] text-leaf font-semibold block">18% GST Accounted</span>
            </div>
            <div className="p-4 bg-chilli/5 rounded-full text-chilli border border-chilli/10">
              <IndianRupee size={28} />
            </div>
          </div>

          {/* Card: Total Orders */}
          <div className="bg-cream p-6 rounded-sm border border-earth/10 shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-earth/50 uppercase tracking-widest block">Total Orders</span>
              <span className="text-3xl font-bold text-earth">{stats.totalOrders}</span>
              <span className="text-[10px] text-earth-light block">Domestic & International</span>
            </div>
            <div className="p-4 bg-earth/5 rounded-full text-earth border border-earth/10">
              <ShoppingBag size={28} />
            </div>
          </div>

          {/* Card: Average Order Value */}
          <div className="bg-cream p-6 rounded-sm border border-earth/10 shadow-sm flex items-center justify-between group">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-earth/50 uppercase tracking-widest block">Avg. Order Value</span>
              <span className="text-3xl font-bold text-leaf">₹{averageOrderValue}</span>
              <span className="text-[10px] text-earth-light block">Logistics factored in</span>
            </div>
            <div className="p-4 bg-leaf/5 rounded-full text-leaf border border-leaf/10">
              <Globe size={28} />
            </div>
          </div>

        </div>

        {/* Mid Grid: Orders by Country (Chart & List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Charts/Stats Column */}
          <div className="lg:col-span-6 bg-cream p-6 rounded-sm border border-earth/10 shadow-sm space-y-6">
            <h3 className="font-cormorant font-bold text-xl text-earth border-b border-earth/15 pb-3">
              🌍 Orders & Revenue By Country
            </h3>
            
            <div className="space-y-4">
              {stats.countryDistribution && stats.countryDistribution.map((countryStat, idx) => {
                const percentage = (parseFloat(countryStat.revenue) / maxRevenue) * 100;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-earth">
                      <span>{countryStat.country} ({countryStat.count} orders)</span>
                      <span>₹{parseFloat(countryStat.revenue).toFixed(2)}</span>
                    </div>
                    {/* CSS Custom Bar Chart */}
                    <div className="w-full bg-earth-beige rounded-full h-3.5 overflow-hidden border border-earth/5 shadow-inner">
                      <div 
                        className="bg-chilli h-full rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent reviews summary */}
          <div className="lg:col-span-6 bg-cream p-6 rounded-sm border border-earth/10 shadow-sm space-y-4">
            <h3 className="font-cormorant font-bold text-xl text-earth border-b border-earth/15 pb-3">
              ⭐ Recent Reviews Feed
            </h3>
            
            <div className="space-y-3 overflow-y-auto max-h-[280px] pr-2">
              {stats.recentReviews && stats.recentReviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-cream-light border border-earth/5 rounded-sm space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-earth">{rev.customer_name} ({rev.country})</span>
                    <div className="flex text-turmeric">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={10} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-earth-light italic font-light">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Panel: Recent Orders Detailed Table */}
        <div className="bg-cream p-6 rounded-sm border border-earth/10 shadow-sm">
          <h3 className="font-cormorant font-bold text-xl text-earth border-b border-earth/15 pb-3 mb-4">
            📦 Recent Orders Database
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-earth/20 bg-earth/5 text-earth uppercase font-bold tracking-wider">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Total Cost</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth/10">
                {stats.recentOrders && stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-earth/5 transition-colors">
                    <td className="p-3 font-semibold text-chilli">#{order.id}</td>
                    <td className="p-3">
                      <div>{order.customer_name}</div>
                      {order.phone && <div className="text-[10px] text-earth-light">{order.phone}</div>}
                    </td>
                    <td className="p-3 font-semibold">{order.product}</td>
                    <td className="p-3 text-center">{order.quantity}</td>
                    <td className="p-3">
                      <div>{order.country}</div>
                      {order.city && <div className="text-[10px] text-earth-light">{order.city}, {order.state}</div>}
                    </td>
                    <td className="p-3 font-bold">₹{parseFloat(order.total).toFixed(2)}</td>
                    <td className="p-3">
                      <span className="inline-block bg-turmeric/20 text-turmeric-dark px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase">
                        {order.payment_status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-3 text-earth-light text-[10px]">
                      {(() => {
                        const d = new Date(order.created_at);
                        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                          + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
