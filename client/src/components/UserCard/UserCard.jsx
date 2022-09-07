import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <button className='userCard'>
      <img src={user?.images[0].url} alt='user-avatar' />
      <p>{user?.display_name}</p>
      <AiFillCaretDown className='userCard-downArrow' />
    </button>
  );
};

export default UserCard;
