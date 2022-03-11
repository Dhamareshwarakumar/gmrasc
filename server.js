const express = require('express');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static('public'));


// Configuration
dotenv.config();
require('./config/db');
require('./config/passport_jwt')(passport);

// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/events', require('./routes/api/events'));


// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));