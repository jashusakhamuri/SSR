const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.getReviews = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Database error fetching reviews' });
  }
};

exports.createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customer_name, country, rating, comment } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO reviews (customer_name, country, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [customer_name, country, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Database error saving review' });
  }
};
