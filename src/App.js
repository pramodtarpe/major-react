import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/UI/Card/Card';
import Button from './Components/UI/Button/Button';
import LineChart from './Components/Charts/LineChart/LineChart';
import Controls from './Components/UI/Controls/Controls';
import Overlay from './Components/Overlay/Overlay';

const initialState = {
  index : 0,
  fetchedData : {},
  controls: [0,1],
  date : "",
  limits: [0,120],
  chartTitle : "BPM",
  chartData : [[],[]]
};

function App() {
  const [state, updateData] = useState(initialState);
  const getData = (data) => {
    updateData(data);
  }

  useEffect(() => {
    fetch("https://dht11-6a986-default-rtdb.firebaseio.com/logs.json/").then(response => {
      return response.json();
    }).then(data => {
      let l_arr = [];
      let d_arr = [];
      for(let x in data){
          let d = new Date(x*1000).toLocaleString();
          l_arr.push(d);
          d_arr.push(data[x].split(" ")[0]);
      }
      initialState.fetchedData = {...data};
      initialState.controls[1] = l_arr.length;
      initialState.controls[0] = l_arr.length-10;
      initialState.date = l_arr[l_arr.length-1].split(',')[0];
      initialState.chartData = [l_arr,d_arr];
      updateData({...initialState});
    });
  },[])

  const setControl = (flag) => {
    let size = (Object.keys(state.fetchedData).length)
    let l = state.controls[0];
    let r = state.controls[1];
    if(flag){
      if(l-10 >= 0){
        l = l-10;
        r = r-10;
      }
      else{
        r = r-l;
        l = 0;
      }
    }
    else{
      if(r+10 <= size){
        l = l+10;
        r = r+10;
      }
      else{
        r = size
        l = r-10;
      }
    }
    let l_arr = [];
    let d_arr = [];
    for(let x in state.fetchedData){
        let d = new Date(x*1000).toLocaleString();
        l_arr.push(d);
        d_arr.push(state.fetchedData[x].split(" ")[state.index]);
    }
    let newL = [];
    let newD = [];
    for(let j=l;j<r;j++){
        newL.push(l_arr[j]);
        newD.push(d_arr[j]);
    }
    state.controls = [l,r];
    state.chartData = [[...newL],[...newD]];
    state.date = newL[0].split(',')[0];
    console.log(state.controls)
    updateData({...state});
  }

  return (
    <React.Fragment>
      <Card className='btn-card'>
        <Button data={state} limits={[0,120]} title={'BPM'} sendData={getData} index={0}/>
        <Button data={state} limits={[-30,60]} title={'Temperature'} sendData={getData} index={1}/>
        <Button data={state} limits={[0,100 ]} title={'SPO2'} sendData={getData} index={2}/>
      </Card>
      <Card className='chart-card'>
        <Overlay data={state.fetchedData} />
        <LineChart limits={state.limits} chartTitle={state.chartTitle} chartData={state.chartData}/>
      </Card>
      <Card className='controls-card'>
        <Controls controls = {state.controls} date={state.date} controlHandler={setControl} />
      </Card>
    </React.Fragment>
  );
}

export default App;