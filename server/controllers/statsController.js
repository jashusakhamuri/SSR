const db = require('../config/db');

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Total Orders count
    const totalOrdersResult = await db.query('SELECT COUNT(*) as count FROM orders');
    const totalOrders = parseInt(totalOrdersResult.rows[0].count);

    // 2. Total Revenue (sum of total)
    const revenueResult = await db.query('SELECT SUM(total) as revenue FROM orders');
    const totalRevenue = parseFloat(revenueResult.rows[0].revenue || 0);

    // 3. Orders by country distribution
    const countryStatsResult = await db.query(
      'SELECT country, COUNT(*) as count, SUM(total) as revenue FROM orders GROUP BY country ORDER BY count DESC'
    );

    // 4. Recent reviews
    const recentReviewsResult = await db.query(
      'SELECT * FROM reviews ORDER BY created_at DESC LIMIT 5'
    );

    // 5. Recent orders
    const recentOrdersResult = await db.query(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 10'
    );

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        countryDistribution: countryStatsResult.rows,
        recentReviews: recentReviewsResult.rows,
        recentOrders: recentOrdersResult.rows,
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Database error fetching dashboard metrics' });
  }
};
