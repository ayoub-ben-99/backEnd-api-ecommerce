const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const http = require('http');
require('colors');
const myEnv = dotenv.config();
const connectDB = require('./config/db');
dotenvExpand.expand(myEnv);

const app = express();

const port = process.env.PORT || 6400;

/**
 * @route GET /products
 * @desc Routes for product management
 * @access Public
 */
const productRoute = require('./routes/product');

/**
 * @route GET /home
 * @desc Home route
 * @access Public
 */
const homeRoute = require('./routes/home');

/**
 * @route GET /carts
 * @desc Routes for cart management
 * @access Public
 */
const cartRoute = require('./routes/cart');

/**
 * @route GET /users
 * @desc Routes for user management
 * @access Public
 */
const userRoute = require('./routes/user');

/**
 * @route POST /auth
 * @desc Routes for authentication
 * @access Public
 */
const authRoute = require('./routes/auth');

// middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.disable('view cache');

/**
 * @route GET /
 * @desc Root route
 * @access Public
 */
app.use('/', homeRoute);

/**
 * @route GET /products
 * @desc Product route
 * @access Public
 */
app.use('/products', productRoute);

/**
 * @route GET /carts
 * @desc Cart route
 * @access Public
 */
app.use('/carts', cartRoute);

/**
 * @route GET /users
 * @desc User route
 * @access Public
 */
app.use('/users', userRoute);

/**
 * @route POST /auth
 * @desc Authentication route
 * @access Public
 */
app.use('/auth', authRoute);

/**
 * @function connectDB
 * @desc Connects to MongoDB and starts the server
 */
connectDB()
  .then(() => {
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log("Server running on port =>".yellow.bold, `http://localhost:${port}`.cyan);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
