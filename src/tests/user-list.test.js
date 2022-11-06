import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createUser, deleteUsersByUsername, findAllUsers} from "../services/users-service";

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>);
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

describe('findAllUsers',  () => {

  // sample user
  const nasa = {
    username: 'NASA',
    password: 'nasa45',
    email: 'nasa@aliens.com'
  };

  // setup test before running test
  beforeAll(() => {
    // remove any/all users to make sure we create it in the test
    return createUser(nasa);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(nasa.username);
  })

  test('user list renders async', async () => {
    const users = await findAllUsers()
    render(
        <HashRouter>
          <UserList users={users}/>
        </HashRouter>);
    const linkElement = screen.getByText(/NASA/i);
    expect(linkElement).toBeInTheDocument();
  })
});

