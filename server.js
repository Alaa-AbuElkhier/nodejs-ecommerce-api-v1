const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App Running On Port ${PORT}`);
});
