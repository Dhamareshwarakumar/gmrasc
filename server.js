const express = require('express');
const app = express();
const dotenv = require('dotenv');


// Configuration
dotenv.config();
require('./config/db');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to GMRIT ACM Student Chapter');
});


// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));