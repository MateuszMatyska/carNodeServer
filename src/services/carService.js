const Car = require("../models/car");

module.exports.getAllCars = async () => {
  const result = await Car.find();
   
  return result;
};

module.exports.getCarById = async (id) => {
  return await Car.findById(id);
};

module.exports.addCar = async (car) => {
  const newCar = new Car({
    id: car.id,
    name: car.name,
    year: car.year,
    color: car.color,
  });

  const result = await newCar.save();

  return result;
};

module.exports.removeCarById = async (id) => {
  return await Car.remove({ _id: id });
};

module.exports.editCar = async (id, car) => {
  return await Car.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: car.name,
        year: car.year,
        color: car.color,
      },
    },
    {
      new: true
    }
  );
};
