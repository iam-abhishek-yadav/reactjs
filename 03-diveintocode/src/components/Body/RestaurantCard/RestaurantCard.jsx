import React from 'react'

const RestaurantCard = (props) => {
    const {resData} = props;
    const {cloudinaryImageId, name, cuisines, avgRating, costForTwoString, deliveryTime} = resData?.data
  return (
    <div className="res-card">
        <img 
            src = {'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' + cloudinaryImageId}
            alt = 'res-logo'
            className='res-logo'
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(' ')}</h4>
        <h4>{deliveryTime} minutes</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwoString}</h4>
    </div>
  )
}

export default RestaurantCard
