const express = require('express');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const path = require('path');


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// app.use(express.static('public'));


// Configuration
dotenv.config();
require('./config/db');
require('./config/passport_jwt')(passport);

// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/events', require('./routes/api/events'));
app.use('/api/payment', require('./routes/api/payment'));

// Server Static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
};


// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));