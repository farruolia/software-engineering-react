import React from "react";
const TuitStats = ({tuit, likeTuit, dislikeTuit}) => {
    return (
        <div className="row mt-2">
            <div className="col text-center">
                <i className="far fa-message me-1"></i>
                {/*{this.props.tuit.stats && this.props.tuit.stats.replies}*/}
            </div>
            <div className="col text-center">
                <i className="far fa-retweet me-1"></i>
                {/*{this.props.tuit.stats && this.props.tuit.stats.retuits}*/}
            </div>
            <div className="col text-center">
                <span>
                    <i className={tuit.stats.likes > 0 ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
                       style={{color: tuit.stats.likes > 0 ? 'red': ''}}
                       onClick={() => likeTuit(tuit)}>
                    </i>
                    {tuit.stats && tuit.stats.likes}
                </span>
            </div>
            <div className="col text-center">
                <span>
                    <i className={tuit.stats.dislikes > 0 ? "fas fa-thumbs-down" : "far fa-thumbs-down"}
                           onClick={() => dislikeTuit(tuit)}>
                    </i>
                    {tuit.stats && tuit.stats.dislikes}
                </span>
            </div>
            <div className="col text-center">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;