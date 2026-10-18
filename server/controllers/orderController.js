const db = require('../config/db');
const { validationResult } = require('express-validator');
const { sendOrderEmails } = require('../utils/email');

// Helper to calculate total costs
async function calculateOrderTotal(productName, quantity, country) {
  const productResult = await db.query('SELECT price FROM products WHERE name = $1', [productName]);
  if (productResult.rows.length === 0) {
    throw new Error(`Product ${productName} not found`);
  }
  const price = parseFloat(productResult.rows[0].price);
  const subtotal = price * quantity;

  const shippingResult = await db.query('SELECT shipping_cost FROM shipping_rates WHERE country = $1', [country]);
  let shipping = 0;
  if (shippingResult.rows.length > 0) {
    shipping = parseFloat(shippingResult.rows[0].shipping_cost);
  } else {
    shipping = country.toLowerCase() === 'india' ? 50.00 : 1000.00;
  }

  const gst = parseFloat((subtotal * 0.18).toFixed(2));
  const total = subtotal + shipping + gst;

  return { subtotal, shipping, gst, total };
}

exports.createIndiaOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Now includes email field for India orders too
  const { name, email, phone, address, pincode, state, city, quantity, product, special_instructions } = req.body;

  try {
    const { subtotal, shipping, gst, total } = await calculateOrderTotal(product, parseInt(quantity), 'India');

    const orderResult = await db.query(
      `INSERT INTO orders 
      (customer_name, email, phone, country, state, city, address, postal_code, product, quantity, subtotal, shipping, gst, total, payment_status)
      VALUES ($1, $2, $3, 'India', $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'Pending')
      RETURNING *`,
      [name, email || null, phone, state, city, address, pincode, product, quantity, subtotal, shipping, gst, total]
    );

    const order = orderResult.rows[0];
    sendOrderEmails(order).catch(err => console.error('Error sending order emails:', err));

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order,
    });
  } catch (error) {
    console.error('Error creating India order:', error);
    res.status(500).json({ error: error.message || 'Database error creating order' });
  }
};

exports.createInternationalOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, country, address, postal_code, quantity, product, special_instructions } = req.body;

  try {
    const { subtotal, shipping, gst, total } = await calculateOrderTotal(product, parseInt(quantity), country);

    const orderResult = await db.query(
      `INSERT INTO orders 
      (customer_name, email, phone, country, address, postal_code, product, quantity, subtotal, shipping, gst, total, payment_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'Pending')
      RETURNING *`,
      [name, email, phone, country, address, postal_code, product, quantity, subtotal, shipping, gst, total]
    );

    const order = orderResult.rows[0];
    sendOrderEmails(order).catch(err => console.error('Error sending order emails:', err));

    res.status(201).json({
      success: true,
      message: 'International order placed successfully!',
      order,
    });
  } catch (error) {
    console.error('Error creating International order:', error);
    res.status(500).json({ error: error.message || 'Database error creating order' });
  }
};

exports.getCountryCount = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT country, COUNT(*) as count FROM orders GROUP BY country ORDER BY count DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching country count:', error);
    res.status(500).json({ error: 'Database error fetching country distribution' });
  }
};
