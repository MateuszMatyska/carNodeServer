require('dotenv').config();

const config = {
    dbUrlCars: process.env.dbUrlCars,
    dbUrlUsers: process.env.dbUrlUsers
}

module.exports = config;
