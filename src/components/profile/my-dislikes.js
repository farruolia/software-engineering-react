import Tuits from "../tuits";
import {useEffect, useState} from "react";
import * as service from "../../services/dislikes-service";

const MyDislikes = () => {

    const [dislikedTuits, setDislikedTuits] = useState([]);

    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);

    return(
        <div>
            <h4>Tuits I dislike</h4>
            <Tuits tuits={dislikedTuits}
                   refreshTuits={findTuitsIDislike}/>
        </div>
    );
};
export default MyDislikes;