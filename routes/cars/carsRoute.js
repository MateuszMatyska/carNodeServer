const express = require('express');
const router = express.Router();
const Car = require('../../models/car');

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch(error) {
    res.json({message: error});
  }
});

router.get('/:id', async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      res.json(car);
    } catch(error) {
      res.json({message: error});
    }
  });

router.post('/addCar', async (req,res) => {
  try {
    const car = new Car({
      id: req.body.id,
      name: req.body.name,
      year: req.body.year,
      color: req.body.color
    });

    const newCar = await car.save();
    res.json(newCar);
  } catch(error) {
      res.json({message: error});
    }
  }
);

router.delete('/deleteCar/:id', async (req, res) => {
    try {
        const removedCar = await Car.remove({_id: req.params.id});
        res.json(removedCar);
    } catch(error) {
        res.json({message: error});
    }

});

router.put('/editCar', async (req, res) => {
    try {
        const bodyId = req.body.id;
        const car = req.body.car;

        const updatedCar = await Car.updateOne(
            {id: bodyId},
            {$set: {
                name: car.name,
                year: car.year,
                color: car.color
            }}
        );
        res.json(updatedCar);
    } catch( error ) {
        res.json({message: error}); 
    }

});

module.exports = router;