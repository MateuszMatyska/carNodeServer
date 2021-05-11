const express = require('express');
const router = express.Router();
const Car = require('../../models/car');
const carService = require('../../services/carService');

router.get('/', async (req, res) => {
  try {
    const cars = await carService.getAllCars();
    res.json(cars);
  } catch(error) {
    res.json({message: error});
  }
});

router.get('/:id', async (req, res) => {
    try {
      const car = await carService.getCarById(req.params.id);
      res.json(car);
    } catch(error) {
      res.json({message: error});
    }
  });

router.post('/addCar', async (req,res) => {
  try {
    const car = await carService.addCar(req.body);
    res.json(car);
  } catch(error) {
      res.json({message: error});
    }
  }
);

router.delete('/deleteCar/:id', async (req, res) => {
    try {
        const removedCar = await carService.removeCarById( req.params.id );
        res.json(removedCar);
    } catch(error) {
        res.json({message: error});
    }

});

router.put('/editCar', async (req, res) => {
    try {
        const bodyId = req.body.id;
        const car = req.body.car;

        const updatedCar = await carService.editCar(bodyId,car);
        res.json(updatedCar);
    } catch( error ) {
        res.json({message: error}); 
    }

});

module.exports = router;