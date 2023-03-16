import React from 'react';

import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  return (
    <div className='categoryCard'>
      <img src={category?.icons[0].url} alt='category' />
      <h1>{category?.name}</h1>
    </div>
  );
};

export default CategoryCard;
