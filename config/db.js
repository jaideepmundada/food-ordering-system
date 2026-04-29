require('dotenv').config();
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'food_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err.message);
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.error('Database "food_db" not found. Please create it and run the SQL script.');
        }
    } else {
        console.log('Connected to MySQL database.');
        connection.release();
    }
});

// Export the promise-based wrapper
module.exports = pool.promise();
