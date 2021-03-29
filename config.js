require('dotenv').config();

const config = {
    dbUrlCars: process.env.dbUrlCars,
    dbUrlUsers: process.env.dbUrlUsers,
    secretToken: process.env.token
}

module.exports = config;
