import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import React from "react";
import * as dislikesService from "../services/dislikes-service";
import MyDislikes from "../components/profile/my-dislikes";
import axios from "axios";
import TuitStats from "../components/tuits/tuit-stats";
import {findAllTuitsDislikedByUser} from "../services/dislikes-service";


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
        postedBy: MOCK_USERS[1],
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

jest.mock('axios')

test('disliked tuits are rendered', async () => {
    axios.get.mockResolvedValue({
        data: [
            {
                _id: "123",
                tuit: "alice's tuit",
                postedBy: MOCK_USERS[1],
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
        ],
    });

    const response = await findAllTuitsDislikedByUser(MOCK_USERS[0]._id)
    render(
        <HashRouter>
            <TuitStats tuit={response.data[0]}/>
        </HashRouter>
    );
    await new Promise(process.nextTick);

    const username = screen.getByText(/tanya/i);
    expect(username).toBeInTheDocument();
});


