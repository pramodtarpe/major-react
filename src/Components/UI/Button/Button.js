import React from "react";
import './Button.css';

const Button = (props) => {
    const clickHandler = (data) => {
        fetch("https://dht11-6a986-default-rtdb.firebaseio.com/logs.json/").then(response => {
            return response.json();
        }).then(data => {
            let i = props.index;
            let l = props.data.controls[0];
            let r = props.data.controls[1];
            let l_arr = [];
            let d_arr = [];
            for(let x in data){
                let d = new Date(x*1000).toLocaleString();
                l_arr.push(d);
                d_arr.push(data[x].split(" ")[i]);
            }
            let newL = [];
            let newD = [];
            for(let j=l;j<r;j++){
                newL.push(l_arr[j]);
                newD.push(d_arr[j]);
            }
            props.sendData({
                index : props.index,
                fetchedData : {...data},
                controls : [l,r],
                date : l_arr[0].split(',')[0],
                limits : props.limits,
                chartTitle : props.title,
                chartData : [newL, newD]
            });
        });
    }
    return (
        <button className="btn-container" onClick={clickHandler}>{props.title}</button>
    );
}

export default Button;