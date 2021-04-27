const Cars = require('../src/models/car');
const db = require('./db');
const carService = require('../src/services/carService');

beforeAll(async () => await db.connect());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const fcar = {
    id: 123, name: "car1", year: 2021, color: "white" 
}

const scar = {
    id: 123, name: "car2", year: 2021, color: "black" 
}

const editedCar = {
    name: "edited", year: 2021, color: "black"
}

describe('Car Service', () => {
    it('get car flow', async done => {
        const faddCar = await carService.addCar(fcar);
        const saddCar = await carService.addCar(scar);

        const db = await carService.getAllCars();
        const getCar = await carService.getCarById(db[0]._id);
        
        const result = db.length;

        expect(result).toEqual(2);
        expect(getCar.id).toEqual(123)
        expect(getCar.name).toEqual("car1")
        expect(getCar.year).toEqual(2021)
        expect(getCar.color).toEqual("white")
        done();
    })

    it('add car flow', async done => {
        const faddCar = await carService.addCar(fcar);
        const saddCar = await carService.addCar(scar);

        const db = await carService.getAllCars();
        
        const result = db.length;

        expect(result).toEqual(2);
        done();
    })

    it('remove flow', async done => {
        const faddCar = await carService.addCar(fcar);
        const saddCar = await carService.addCar(scar);

        const getId = await carService.getAllCars();

        await carService.removeCarById(getId[0]._id);
        
        const db = await carService.getAllCars();

        const result = db.length;

        expect(result).toEqual(1);
        done();
    })

    it('edit flow', async done => {
        const faddCar = await carService.addCar(fcar);
        const saddCar = await carService.addCar(scar);

        const getId = await carService.getAllCars();

        await carService.editCar(getId[0]._id, editedCar);
        
        const db = await carService.getAllCars();

        const result = db.length;

        expect(result).toEqual(2);
        expect(db[0].name).toEqual("edited");
        expect(db[0].year).toEqual(2021);
        expect(db[0].color).toEqual("black");
        done();
    })
})