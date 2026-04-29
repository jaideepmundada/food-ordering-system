# Food Ordering System

A simple, beginner-friendly full-stack food ordering website.

## Tech Stack
- **Frontend**: HTML, Vanilla CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Setup Instructions

### 1. Database Setup
1. Make sure you have MySQL installed and running.
2. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or terminal).
3. Run the following SQL commands to create the database and tables, and insert some dummy data:

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS food_db;
USE food_db;

-- Create the foods table
CREATE TABLE IF NOT EXISTS foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create the orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy data into foods table
INSERT INTO foods (name, price) VALUES 
('Classic Burger', 8.99),
('Margherita Pizza', 12.50),
('Spaghetti Bolognese', 14.00),
('Caesar Salad', 7.99),
('Chocolate Lava Cake', 6.50);
```

### 2. Configure Database Connection
If your MySQL root user has a password, open `config/db.js` and update the `password` field:
```javascript
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password_here', // <-- Update this
    database: 'food_db',
    // ...
});
```

### 3. Install Dependencies
Open a terminal in the `food-ordering-system` folder and run:
```bash
npm install
```

### 4. Run the Server
Start the development server:
```bash
npm start
```
or 
```bash
npm run dev
```
(If you want nodemon to automatically restart on changes)

### 5. Open the Application
Open your web browser and navigate to:
[http://localhost:3000](http://localhost:3000)

## Features
- **Home Page**: Fetches and displays a list of food items from the MySQL database.
- **Cart System**: Uses `localStorage` to manage cart state without complex libraries.
- **Checkout**: A simple form to submit an order which saves it to the MySQL database.
