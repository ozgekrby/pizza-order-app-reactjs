import React from 'react'
import { useHistory } from 'react-router-dom';
export default function Anasayfa() {
  const history = useHistory();

  const handleOrderFormClick = () => {
    history.push('/siparis-olustur');
  };

  return (
    <div className='home'>
    <img src="Assets/Iteration-1-assets/kod-aciktirir.svg" alt="" />
      <div className="btn1"><button onClick={handleOrderFormClick} className='main-button'>
    ACIKTIM
  </button></div>
    </div>
  )
}
