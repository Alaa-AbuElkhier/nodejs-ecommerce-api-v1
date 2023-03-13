const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//for env file
dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
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

//Handling Routes error if we hit invalid route
app.all('*', (req, res, next) => {
  next(new ApiError(`Cant find this route : ${req.originalUrl}`, 400));
});

//Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App Running On Port ${PORT}`);
});

//Handling rejection outside express
//Events=>lis=>callback(err)
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors : ${err}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
