const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/foods -> fetch all food items
router.get('/foods', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM foods');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/order -> save order
router.post('/order', async (req, res) => {
    try {
        const { customer_name, phone, address, total_amount } = req.body;
        
        // Basic validation
        if (!customer_name || !phone || !address || total_amount === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const query = 'INSERT INTO orders (customer_name, phone, address, total_amount) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [customer_name, phone, address, total_amount]);
        
        res.status(201).json({ message: 'Order placed successfully!', orderId: result.insertId });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
