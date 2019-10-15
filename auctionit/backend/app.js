const express = require('express');
const body = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://127.0.0.1:27017/auctionit',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB !');
  })
  .catch((err) => {
    console.log('Failed to Connec to DB.!', err);
  });

app.use(body.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,  PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/user', userRoutes);
module.exports = app;
