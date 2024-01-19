import { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import RestaurantCard from './RestaurantCard/RestaurantCard';

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredrestaurants, setFilteredRestaurants] = useState([]);
  const [isTopRatedActive, setIsTopRatedActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const jsondata = await resp.json();
      const restaurantData = jsondata?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setRestaurants(restaurantData);
      setFilteredRestaurants(restaurantData);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    const newList = restaurants.length !== filteredrestaurants.length
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.info.avgRating >= 4.5);
    setFilteredRestaurants(newList);
    setIsTopRatedActive(!isTopRatedActive);
  };

  const handleReset = () => {
    setFilteredRestaurants(restaurants);
    setIsTopRatedActive(false);
    setSearchQuery('');
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const handleSearch = debounce((query) => {
    const filteredList = restaurants.filter((res) => {
      const nameMatch = res.info.name.toLowerCase().includes(query.toLowerCase());
      const cuisineMatch = res.info.cuisines.some(cuisine => cuisine.toLowerCase().includes(query.toLowerCase()));
      return nameMatch || cuisineMatch;
    });
    setFilteredRestaurants(filteredList);
  }, 300);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    handleSearch(newQuery);
  };

  return restaurants.length === 0 ? <Shimmer /> : (
    <div className='body'>
      <div className="search-container">
        <input
          type="text"
          placeholder='Search for Restaurant or Foods'
          className='search-box'
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className={isTopRatedActive ? 'active' : ''} onClick={handleClick}>Top Rated Restaurants</button>
        <button onClick={handleReset}>Reset All</button>
      </div>
      <div className="res-container">
        {filteredrestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
