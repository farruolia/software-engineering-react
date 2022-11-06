import {createTuit, deleteTuit, deleteTuitByUser, findTuitById} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('createTuit', () => {
    // sample user who creates tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    let newUser;

    // setup test before running test
    beforeAll( async () => {
        newUser = await createUser(ripley)
        return deleteTuitByUser(newUser._id);
    })

    afterAll(async () => {
        await deleteTuitByUser(newUser._id)
        return deleteUsersByUsername(ripley.username);
    })

    test('can insert new tuits with REST API', async () => {

        const mockTuit = {
            tuit: 'This is a mock tuit for testing',
            postedOn: '2022-11-15T00:00:00.000Z',
            postedBy: `${newUser._id}`
        }
        //insert new tuit in the database
        const newTuit = await createTuit(newUser._id, mockTuit);

        //verify tuits parameters match the parameters of new tuit created
        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedOn).toEqual(mockTuit.postedOn);
        expect(newTuit.postedBy).toEqual(mockTuit.postedBy);
    })
});

describe('deleteTuit', () => {
    // sample user who creates tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit
    const tuit1 = {
        tuit: 'This is a mock tuit for testing'
    }

    let newUser;
    let newTuit;

    // setup test before running test
    beforeAll( async () => {
        newUser = await createUser(ripley)
        newTuit = await createTuit(newUser._id, tuit1);
    })

    afterAll(async () => {
        await deleteTuitByUser(newUser._id)
        return deleteUsersByUsername(ripley.username);
    })

    test('can delete tuit wtih REST API', async () => {

        // delete tuit
        const status = await deleteTuit(newTuit._id);

        // verify we deleted tuit by their id
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('findTuitById', () => {
    // sample user who creates tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    let newUser;

    // setup test before running test
    beforeAll( async () => {
        newUser = await createUser(ripley)
        return deleteTuitByUser(newUser._id);
    })

    afterAll(async () => {
        await deleteTuitByUser(newUser._id)
        return deleteUsersByUsername(ripley.username);
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {

        const mockTuit = {
            tuit: 'This is a mock tuit for testing',
            postedOn: '2022-11-15T00:00:00.000Z',
            postedBy: `${newUser._id}`
        }
        //insert new tuit in the database
        const newTuit = await createTuit(newUser._id, mockTuit);

        //verify tuits parameters match the parameters of new tuit created
        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedOn).toEqual(mockTuit.postedOn);
        expect(newTuit.postedBy).toEqual(mockTuit.postedBy);

        const existingTuit = await findTuitById(newTuit._id)

        //verify tuits parameters match the parameters of tuit retrieved
        expect(existingTuit.tuit).toEqual(mockTuit.tuit);
        expect(existingTuit.postedOn).toEqual(mockTuit.postedOn);
        expect(existingTuit.postedBy).toEqual(newUser);
    })
});

describe('can retrieve all tuits with REST API', () => {
    // sample user who creates tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const anna = {
        username: 'annamontanna',
        password: 'kl426',
        email: 'annamontanna@gmail.com'
    };

    let newUser1;
    let newUser2;

    // setup test before running test
    beforeAll( async () => {
        newUser1 = await createUser(ripley)
        newUser2 = await createUser(anna)
        await deleteTuitByUser(newUser1._id);
        return deleteTuitByUser(newUser2._id);
    })

    afterAll(async () => {
        await deleteTuitByUser(newUser1._id)
        await deleteUsersByUsername(ripley.username);
        await deleteTuitByUser(newUser2._id)
        return deleteUsersByUsername(anna.username);
    })

    test('can retrieve all tuits with REST API', async () => {

        const mockTuit1 = {
            tuit: 'This is a mock tuit for testing for ripley',
            postedOn: '2022-11-15T00:00:00.000Z',
            postedBy: `${newUser1._id}`
        }

        const mockTuit2 = {
            tuit: 'This is a mock tuit for testing for anna',
            postedOn: '2021-12-15T00:00:00.000Z',
            postedBy: `${newUser2._id}`
        }
        //insert new tuit in the database
        const newTuit1 = await createTuit(newUser1._id, mockTuit1);
        const newTuit2 = await createTuit(newUser2._id, mockTuit2);

        //verify tuits parameters match the parameters of new tuit created
        expect(newTuit1.tuit).toEqual(mockTuit1.tuit);
        expect(newTuit1.postedOn).toEqual(mockTuit1.postedOn);
        expect(newTuit1.postedBy).toEqual(mockTuit1.postedBy);

        //verify tuits parameters match the parameters of new tuit created
        expect(newTuit2.tuit).toEqual(mockTuit2.tuit);
        expect(newTuit2.postedOn).toEqual(mockTuit2.postedOn);
        expect(newTuit2.postedBy).toEqual(mockTuit2.postedBy);

        const existingTuit1 = await findTuitById(newTuit1._id)
        const existingTuit2 = await findTuitById(newTuit2._id)

        //verify tuits parameters match the parameters of tuit retrieved
        expect(existingTuit1.tuit).toEqual(mockTuit1.tuit);
        expect(existingTuit1.postedOn).toEqual(mockTuit1.postedOn);
        expect(existingTuit1.postedBy).toEqual(newUser1);

        //verify tuits parameters match the parameters of tuit retrieved
        expect(existingTuit2.tuit).toEqual(mockTuit2.tuit);
        expect(existingTuit2.postedOn).toEqual(mockTuit2.postedOn);
        expect(existingTuit2.postedBy).toEqual(newUser2);

    })
});