import React, {useEffect, useState} from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";

function Tuits({tuits = [], deleteTuit, refreshTuits}) {

    const [tuitsState, setTuits] = useState(tuits);
    useEffect(() => setTuits(tuits), [tuits]);

    const likeTuit = (tuit) =>
        likesService
            .userTogglesTuitLikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const dislikeTuit = (tuit) => {
        dislikesService
            .userTogglesTuitDislikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    }


    return (
        <div>
            {tuitsState.length > 0 &&
                <ul className="list-group">
                    {
                        tuitsState.map(tuit =>
                            <Tuit key={tuit._id}
                                  deleteTuit={deleteTuit}
                                  likeTuit={likeTuit}
                                  dislikeTuit={dislikeTuit}
                                  tuit={tuit}/>)
                    }
                </ul>
            }
            {
                tuitsState.length < 1 &&
                <h6>No Tuits</h6>
            }
        </div>
  );
}

export default Tuits;