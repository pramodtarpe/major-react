import React from "react";
import './Button.css';

const Button = (props) => {
    const clickHandler = (data) => {
        fetch("https://dht11-6a986-default-rtdb.firebaseio.com/logs.json/").then(response => {
            return response.json();
        }).then(data => {
            let l_arr = [];
            let d_arr = [];
            let i = props.index;
            for(let x in data){
                let d = new Date(x * 1000).toLocaleString();
                l_arr.push(d);
                d_arr.push(data[x].split(" ")[i]);
            }
            props.sendData({
                limits : props.limits,
                chartTitle : props.title,
                chartData : [l_arr,d_arr]
            });
        });
    }
    return (
        <button className="btn-container" onClick={clickHandler} >{props.title}</button>
    );
}

export default Button;