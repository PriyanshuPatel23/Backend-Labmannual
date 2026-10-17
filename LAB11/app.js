require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const apiRouter = require('./routes');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).type('text/plain')
        .send('404 – page not found');
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
});

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lab11_demo';

mongoose.connect(DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});