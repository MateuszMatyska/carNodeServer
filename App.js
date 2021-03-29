const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./routes/auth/authRoute');
const cars = require('./routes/cars/carsRoute');

const authMiddleware = require('./middlewares/authMiddleware');

app.use(cors());
app.use(bodyParser.json());

app.use('/auth',users);
app.use('/cars',authMiddleware,cars);

mongoose.connect(config.dbUrlCars, {useNewUrlParser: true}, () => console.log('connected to DB'));

app.listen(5000)