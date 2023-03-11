const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
//for env file
dotenv.config({ path: 'config.env' });

//connect with db
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(`Database Connected:${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error : ${err}`);
  });

//express app
const app = express();

//middlewares
app.use(express.json());
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//1.create schema
const categorySchema = new mongoose.Schema({
  name: String,
});
//2.create model
const CategoryModel = mongoose.model('Category', categorySchema);

//Routes
app.post('/', (req, res) => {
  const name = req.body.name;
  console.log(name);
  const newCategory = new CategoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get('/', function (req, res) {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App Running On Port ${PORT}`);
});
