import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../components/tuits";
import React from "react";
import TuitStats from "../components/tuits/tuit-stats";


const MOCK_USERS = [
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
        postedBy: MOCK_USERS[0],
        stats: {
            replies: 0,
            retuits: 0,
            likes: 0,
            dislikes: 4,
        }
    },
    {
        _id: "345",
        tuit: "bob's tuit",
        postedBy: MOCK_USERS[1],
        stats: {
            replies: 1,
            retuits: 2,
            likes: 0,
            dislikes: 4,
        }
    },
    {
        _id: "890",
        tuit: "charlie's tuit",
        postedBy: MOCK_USERS[2],
        stats: {
            replies: 2,
            retuits: 3,
            likes: 0,
            dislikes: 4,
        }
    }
];

/*Testing dislike screen*/
test('tuit list renders static disliked tuit array', () => {
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>);
    const linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument();
});

/*Testing dislike button*/
test('renders tuit stats, with dislike button', () => {
    render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUITS[0]}/>
        </HashRouter>);
    const linkElement = screen.getByText(/4/i);
    expect(linkElement).toBeInTheDocument();
});



