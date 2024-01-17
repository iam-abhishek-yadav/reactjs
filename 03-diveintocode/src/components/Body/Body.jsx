import React from 'react';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import resList from '../../data/resList';

const Body = () => {
  return (
    <div className='body'>
      <div className="search-container">
        <input type="text" placeholder='Search Food or Restaurant' />
        <button>Search</button>
      </div>
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
