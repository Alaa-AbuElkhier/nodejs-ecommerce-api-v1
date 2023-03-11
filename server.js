const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//for env file
dotenv.config({ path: 'config.env' });

const app = express();

//apply  morgan middleware on development mode to see request state
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
  console.log(`mode:${process.env.NODE_ENV}`);
}

app.get('/', function (req, res) {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App Running On Port ${PORT}`);
});
