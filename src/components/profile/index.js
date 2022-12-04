import * as service from "../../services/auth-service"
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import MyTuits from "./my-tuits";

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
          <button className="btn btn-primary mb-3" onClick={logout}>
              Logout</button>
          <MyTuits/>
      </>
  );
};
export default Profile;