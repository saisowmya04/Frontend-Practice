import React from "react";

function Card(props) {
    return (
        <div className="card">
            <img src={props.details.image} alt="" />
            <h1>{props.details.title}</h1>
            <h1>{props.details.price}</h1>
        </div>
    )
}

export default Card