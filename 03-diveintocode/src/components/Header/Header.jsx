import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LOGO_URL } from '../../utils/constants';

const Header = () => {
  const [btnName, setBtnName] = useState('LogIn');
  const handleBtnClick = () => {
    setBtnName(btnName === 'LogIn' ? 'LogOut' : 'LogIn');
  };

  return (
    <div className='header'>
      <div className='logo-container'>
        <img src={LOGO_URL} className='logo' alt='logo' />
      </div>
      <div className='nav-items'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About Us</Link></li>
          <li><Link to='/contact'>Contact Us</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
          <li onClick={handleBtnClick}>{btnName}</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;