import * as service from "../../services/auth-service"
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import MyTuits from "./my-tuits";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect( async () => {
      try {
          const user = await service.profile();
          setProfile(user);
      } catch (e) {
          navigate('/login');
      }
  }, []);
  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }
  return(
      <>
          <h1>Profile</h1>
          <h4>{profile.username}</h4>
          <h6>@{profile.username}</h6>

          <Link to="/profile/mytuits" className="text-decoration-none mb-3">
              My Tuits | </Link>
          <Link to="/profile/mylikes" className="text-decoration-none  mb-3">
              Tuits I Like | </Link>
          <Link to="/profile/mydislikes" className="text-decoration-none  mb-3">
              Tuits I Dislike</Link>

          <br/>
          <br/>
          <button className="btn btn-primary mb-3" onClick={logout}>
              Logout</button>

          <Routes>
              <Route path="/mytuits"
                     element={<MyTuits/>}/>
              <Route path="/mylikes"
                     element={<MyLikes/>}/>
              <Route path="/mydislikes"
                     element={<MyDislikes/>}/>
          </Routes>

      </>
  );
};
export default Profile;