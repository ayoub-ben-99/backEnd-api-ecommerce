const mongoose = require('mongoose');
require('colors')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`\nConnected to the =>`.yellow.bold , `database`.cyan);
} catch (err) {
    console.error('Database connection failed:'.red, err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
