import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";

function Tuits({tuits = [], deleteTuit, refreshTuits}) {

    const likeTuit = (tuit, like) =>
        likesService
            .userTogglesTuitLikes("me", tuit._id, like)
            .then(refreshTuits)
            .catch(e => alert(e))
    return (
        <>
            <ul className="list-group">
                {
                    tuits.map(tuit =>
                        <Tuit key={tuit._id}
                              deleteTuit={deleteTuit}
                              likeTuit={likeTuit}
                              tuit={tuit}/>)
                }
            </ul>
        </>
  );
}

export default Tuits;