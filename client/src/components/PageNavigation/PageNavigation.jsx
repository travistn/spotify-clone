import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import './PageNavigation.css';

const PageNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className='pageNavigation'>
      <IoChevronBackOutline className='pageNavigation-icon' onClick={() => navigate(-1)} />
      <IoChevronForwardOutline className='pageNavigation-icon' onClick={() => navigate(1)} />
    </div>
  );
};

export default PageNavigation;
