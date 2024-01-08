const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index'));
app.use('/posts', require('./routes/posts'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});