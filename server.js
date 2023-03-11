const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//for env file
dotenv.config({ path: 'config.env' });

const dbConnection = require('./config/db');
const categoryRoute = require('./routes/categoryRoute');

//Connect with db
dbConnection();

//express app
const app = express();

//middlewares
app.use(express.json());
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//Mount Routes
app.use('/api/v1/categories', categoryRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App Running On Port ${PORT}`);
});
