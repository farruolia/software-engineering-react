import axios from "axios";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {deleteTuit, findAllTuits} from "../services/tuits-service";
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

jest.mock('axios');

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
        </HashRouter>);

    const linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument();
});