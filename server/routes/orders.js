const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');

router.post(
  '/india',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('address').trim().notEmpty().withMessage('Delivery address is required'),
    body('pincode').trim().isLength({ min: 6, max: 6 }).withMessage('Pincode must be exactly 6 digits'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('product').trim().notEmpty().withMessage('Product choice is required'),
  ],
  orderController.createIndiaOrder
);

router.post(
  '/international',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email address is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('country').trim().notEmpty().withMessage('Destination country is required'),
    body('address').trim().notEmpty().withMessage('Delivery address is required'),
    body('postal_code').trim().notEmpty().withMessage('Postal code is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('product').trim().notEmpty().withMessage('Product choice is required'),
  ],
  orderController.createInternationalOrder
);

router.get('/country-count', orderController.getCountryCount);

module.exports = router;
