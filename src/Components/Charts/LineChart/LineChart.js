import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './LineChart.css'; 

var options = {
  scales: {
      y: {
          min: 0,
          max: 120
      },
  }
}

export default function LineChart(props){
  const xlimit = -25;
  const userData = {
    labels : props.chartData[0].slice(xlimit),
    datasets : [
      {
        label: props.chartTitle,
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: props.chartData[1].slice(xlimit),
      }
    ]
  }
  return(
    <div className='linechart-container'> 
      <Line
        data={userData}
        options={options}
      />
    </div>
  );
}