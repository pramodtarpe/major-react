import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/UI/Card/Card';
import Button from './Components/UI/Button/Button';
import LineChart from './Components/Charts/LineChart/LineChart';
import Controls from './Components/UI/Controls/Controls';

function App() {
  const [state, updateData] = useState({
    limits: [0,120],
    chartTitle : "BPM",
    chartData : [[],[]]
  });
  const getData = (data) => {
    updateData(data);
  }

  useEffect(() => {
    fetch("https://dht11-6a986-default-rtdb.firebaseio.com/logs.json/").then(response => {
      return response.json();
    }).then(data => {
      const initialState = {
        limits: [0,120],
        chartTitle : "BPM",
        chartData : [[],[]]
      };
      let l_arr = [];
      let d_arr = [];
      for(let x in data){
          let d = new Date(x * 1000).toLocaleString();
          l_arr.push(d);
          d_arr.push(data[x].split(" ")[0]);
      }
      initialState.chartData = [l_arr,d_arr];
      updateData(initialState);
    });
  },[])


  return (
    <React.Fragment>
      <Card className='btn-card'>
        <Button limits={[0,120]} title='BPM' sendData={getData} index={0}/>
        <Button limits={[-30,70]} title='Temperature' sendData={getData} index={1}/>
        <Button limits={[0,100]} title='SPO2' sendData={getData} index={2}/>
      </Card>
      <Card className='chart-card'>
        <LineChart limits={state.limits} chartTitle={state.chartTitle} chartData={state.chartData}/>
      </Card>
      <Card className='controls-card'>
        <Controls />
      </Card>
    </React.Fragment>
  );
}

export default App;