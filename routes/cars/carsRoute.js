const express = require('express');

const router = express.Router();

let carsArray = [];

router.get('/', (req, res) => {
    res.send(carsArray);
});

router.post('/addCar', (req,res) => {
    if (req.body) {
        const car = {
            id: req.body.id,
            name: req.body.name,
            year: req.body.year,
            color: req.body.color
        };

        carsArray.push(car);

        res.send('Done');
    }
});

router.delete('/deleteCar', (req, res) => {
    if(req.body) {
        const id = req.body.id;
        carsArray = carsArray.filter(item => item.id !== id);

        res.send('Done');
    }
});

router.put('/editCar', (req, res) => {
    if(req.body) {
        const id = req.body.id;
        const car = req.body.car;

        carsArray = carsArray.map(item => {
            if(item.id === id) {
                return {
                    id: id,
                    name: car.name,
                    year: car.year,
                    color: car.color
                }
            }
            return item
        })

        res.send('Done');
    }
});

module.exports = router;