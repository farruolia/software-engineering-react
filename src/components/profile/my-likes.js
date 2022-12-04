import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyLikes = () => {
    const [likedTuits, setLikedTuits] = useState([]);

    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuits(tuits));

    useEffect(findTuitsILike, []);

    return(
        <div>
            <h4>Tuits I like</h4>
            <Tuits tuits={likedTuits}
                   refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;