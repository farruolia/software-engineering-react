import {useState} from "react";
import * as service
    from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const signup = () =>
        service
            .signup(newUser)
            .then(() => navigate('/profile'))
            .catch(e => alert(e));
    return (
        <div>
            <h1>Signup</h1>
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="username">Username: </label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username"
                           onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password: </label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                           onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email: </label>
                    <input type="email" className="form-control" id="email" placeholder="Email"
                           onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                </div>
                <button className="btn btn-primary" onClick={signup}>Submit</button>
            </form>
        </div>
    );
}
export default Signup;