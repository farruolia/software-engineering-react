import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, deleteTuit, deleteTuitByUser, findAllTuits} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import Tuits from "../components/tuits";
import React from "react";

const MOCKED_USERS = [
    {
        _id: "123",
        username: 'kareena',
        password: 'alice34',
        email: 'alice@gmail.com'
    },
    {
        _id: "345",
        username: 'tanya',
        password: 'bob12',
        email: 'bob@gmail.com'
    },
    {
        _id: "890",
        username: 'charmi',
        password: 'charlie67',
        email: 'charlie@gmail.com'
    }
];

const MOCKED_TUITS = [
    {
        _id: "123",
        tuit: "alice's tuit",
        postedBy: MOCKED_USERS[0]
    },
    {
        _id: "345",
        tuit: "bob's tuit",
        postedBy: MOCKED_USERS[1]
    },
    {
        _id: "890",
        tuit: "charlie's tuit",
        postedBy: MOCKED_USERS[2]
    }
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS} deleteTuit={deleteTuit}/>
      </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

describe('findAllTuits',  () => {

    let newUser;

    // setup test before running test
    beforeAll( async () => {
        newUser = await createUser({
            username: `${MOCKED_USERS[0].username}`,
            password: `${MOCKED_USERS[0].username}123`,
            email: `${MOCKED_USERS[0].username}890@gmail.com`
        })

        // insert several known tuits
        MOCKED_TUITS.map(async tuit =>
            await createTuit(newUser._id, {
                tuit: `${tuit.tuit}`,
                postedBy: newUser
            })
        )
    })

    // setup test before running test
    afterAll( async () => {

        await deleteTuitByUser(newUser._id)
        return deleteUsersByUsername(newUser.username);
    })

    test('tuit list renders async', async () => {
        const tuits = await findAllTuits()
        render(
            <HashRouter>
                <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
            </HashRouter>);
        const linkElement = screen.getByText(/bob's tuit/i);
        expect(linkElement).toBeInTheDocument();
    })
});

