const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./src/controllers/auth/authController');
const cars = require('./src/controllers/cars/carsController');

const authMiddleware = require('./src/middlewares/authMiddleware');

app.use(cors());
app.use(bodyParser.json());

app.use('/auth',users);
// app.use('/cars',authMiddleware,cars);
app.use('/cars',cars);

mongoose.connect(config.dbUrlCars, {useNewUrlParser: true}, () => console.log('connected to DB'));

app.listen(5000)