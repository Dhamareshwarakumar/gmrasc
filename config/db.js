const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error(err));