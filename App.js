const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

const cars = require('./routes/cars/carsRoute');

app.use(cors());
app.use(bodyParser.json());
app.use('/cars',cars);

mongoose.connect(config.dbUrlCars, {useNewUrlParser: true}, () => console.log('connected to DB'));

app.listen(5000)