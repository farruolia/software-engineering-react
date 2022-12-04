import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as service from "../../services/auth-service";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()

    const login = () => {
        service
            .login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="username">Username: </label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username"
                           onChange={(e) => setLoginUser({...loginUser, username: e.target.value})}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password: </label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                           onChange={(e) => setLoginUser({...loginUser, password: e.target.value})}
                    />
                </div>
                <button className="btn btn-primary" onClick={login}>Login</button>
            </form>
        </div>
    );
};
