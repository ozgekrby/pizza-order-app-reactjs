import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const HeaderNav = () => {
  const history = useHistory();
  const [activeButton, setActiveButton] = useState('order');

  const handleHomeClick = () => {
    history.push('/home');
    setActiveButton('home');
  };

  const handleOrderFormClick = () => {
    history.push('/siparis-olustur');
    setActiveButton('order');
  };

  return (
    <nav class="header-nav">
      <div className='nav-buttons'>
      <button className={`home-button ${activeButton === 'home' ? 'bold' : ''}`}  onClick={handleHomeClick}>Anasayfa</button> - 
      <button className={`order-page-button ${activeButton === 'order' ? 'bold' : ''}`}   onClick={handleOrderFormClick}>Sipariş Oluştur</button>
      </div>
    </nav>
  );
};

export default HeaderNav;