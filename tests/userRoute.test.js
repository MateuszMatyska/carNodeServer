const User = require('../src/models/user');
const db = require('./db');
const userService = require('../src/services/authService');
const md5 = require('md5');

beforeAll(async () => await db.connect());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const testUser = {
    name: 'Joe',
    password: 'test123',
    token: 'testToken' 
}

describe('User Service', () => {
    it('add user flow', async done => {
        const {name,password,token} = testUser;
        await userService.addUser(name,password,token);

        const result = await userService.checkIfUserExist(testUser);
        
        expect(result.name).toEqual('Joe');
        expect(result.password).toEqual(md5('test123'));
        expect(result.token).toEqual('testToken');
        done();
    });

    it('login user flow', async done => {
        const newToken = 'newTestToken';
        const {name,password,token} = testUser;
        await userService.addUser(name,password,token);

        const loginUser = await userService.loginUser(name, password);
        
        expect(loginUser.name).toEqual('Joe');
        expect(loginUser.password).toEqual(md5('test123'));
        expect(loginUser.token).toEqual('testToken');

        const updateUser = await userService.updateUserToken(name, newToken);

        expect(updateUser.name).toEqual('Joe');
        expect(updateUser.password).toEqual(md5('test123'));
        expect(updateUser.token).toEqual('newTestToken');
        done();
    });

})