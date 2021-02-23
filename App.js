const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const cars = require('./routes/cars/carsRoute');

app.use(bodyParser.json());
app.use('/cars',cars);

app.listen(5000)