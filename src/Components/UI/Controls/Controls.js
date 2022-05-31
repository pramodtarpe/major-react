import React from 'react';
import './Controls.css';

export default function Controls(props) {
  const leftClickHandler = (event) => {
    event.preventDefault();
    props.controlHandler(true);
  }
  const rightClickHandler = (event) => {
    event.preventDefault();
    props.controlHandler(false);
  }

  return (
    <div className='controls-container'>
      <button onClick={leftClickHandler} className='btn-container'> <p>{'<'}</p> </button>
      <div className='controls-text'>
        <h3>Showing Data from {props.date}</h3>
        <h3>Sleep Monitoring System Using ESP Module</h3>
      </div>
      <button onClick={rightClickHandler} className='btn-container'> <p>{'>'}</p> </button>
    </div>
  )
}
