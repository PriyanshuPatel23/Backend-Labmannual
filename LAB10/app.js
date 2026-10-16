const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const apiRouter = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).type('text/plain')
    .send('404 – page not found');
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: err.message });
});

const DB_URI = process.env.MONGODB_URI ||
               'mongodb://localhost:27017/lab10_demo';
mongoose.connect(DB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});