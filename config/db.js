const mongoose = require('mongoose');
const db = () => {
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
};
module.exports = db;
