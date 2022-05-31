import React from 'react';
import './Controls.css';

export default function Controls() {
  return (
    <div className='controls-container'>
      <button className='btn-container'> <p>{'<'}</p> </button>
      <h3>Sleep Monitoring System Using ESP Module</h3>
      <button className='btn-container'> <p>{'>'}</p> </button>
    </div>
  )
}
