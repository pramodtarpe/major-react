import React, { useState } from 'react';
import './App.css';
import Card from './Components/UI/Card/Card';
import Button from './Components/UI/Button/Button';
import LineChart from './Components/Charts/LineChart/LineChart';

function App() {
  const [state, updateData] = useState({
    chartTitle : "BPM",
    chartData : [[],[]]
  });
  const getData = (data) => {
    console.log(data.chartData[1].length)
    updateData(data);
  }

  return (
    <React.Fragment>
      <Card className='btn-card'>
        <Button title='BPM' sendData={getData} index={0}/>
        <Button title='Temperature' sendData={getData} index={1}/>
        <Button title='SPO2' sendData={getData} index={2}/>
      </Card>
      <Card>
        <LineChart chartTitle={state.chartTitle} chartData={state.chartData}/>
      </Card>
    </React.Fragment>
  );
}

export default App;