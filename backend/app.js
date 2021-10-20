const express = require('express');
const rateLimit = require("express-rate-limit");
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const path = require('path');
const app = express();
const db = require("./models");

const accountLimiter = rateLimit({
  //maximum 20 requests every 5 minutes
  windowMs: 5 * 60 * 1000,
  max: 20,
  message:
    "Too many connection attempts from this IP address, please try again after five minutes"
});

//authorized header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//limit the number of requests for identification
app.use('/api/auth', accountLimiter)

//create database tables if they do not exist
db.sequelize.sync();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;