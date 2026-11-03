import React from "react";
import doctor_image from "../assets/doctor_image.png";

function Card(props) {
    return (
        <div className="card">

            <div className="doctor-info">

                <div className="img">
                    <img src={doctor_image} alt="Doctor" />
                </div>

                <div className="doctor-details">
                    <h2>{props.details.name}</h2>
                    <h3>{props.details.specialization}</h3>
                    <p>{props.details.gender}</p>
                </div>

            </div>

            <button className="btn3">
                View Details
            </button>

        </div>
    );
}

export default Card;