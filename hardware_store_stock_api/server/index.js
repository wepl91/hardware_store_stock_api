require('./config/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse application/json
app.use(bodyParser.json())
// Global routes
app.use(require('./routes/index'));

app.get('/', function (req, res) {
  res.send({ data: 'Proximamente: LA DOCUMENTACIÓN' });
})

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
      
  console.log("Database connected");
});

app.listen(process.env.PORT, ()=> {
  console.log(`Running on port ${process.env.PORT}`);
});
