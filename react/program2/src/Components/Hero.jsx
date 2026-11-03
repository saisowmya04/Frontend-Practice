import React, { useState } from "react";
import axios from "axios";
import Card from '../Components/Card';
import { useEffect } from "react";

function Hero() {

    const [data, setData] = useState([]);

    async function getData() {
        let res = await axios.get("https://doc-back-v2nv.onrender.com/doctors");
        console.log(res.data);
        setData(res.data);
    }

    let newArr = data.map((item, ind) => {
        return <Card details={item} key={item.id} />
    });

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="cards-container d-flex-row flex-wrap gap-5">
                {newArr}
            </div>
        </div>
    )
}

export default Hero