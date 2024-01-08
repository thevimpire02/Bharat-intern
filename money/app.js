const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/money_tracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model (e.g., Expense model)
const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: String, // 'income' or 'expense'
});

const Expense = mongoose.model('Expense', expenseSchema);

// API endpoint to handle expense creation
app.post('/api/expense', (req, res) => {
    const { description, amount, type } = req.body;

    const newExpense = new Expense({
        description,
        amount,
        type,
    });

    newExpense.save((err) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ message: 'Expense added successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});