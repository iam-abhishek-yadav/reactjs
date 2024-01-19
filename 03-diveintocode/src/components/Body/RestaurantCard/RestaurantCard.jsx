import { CDN_URL } from "../../../utils/constants";
import PropTypes from 'prop-types'

const RestaurantCard = (props) => {
    const { resData } = props;
    const {cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla} = resData?.info
  return (
    <div className="res-card">
        <img 
            src = {CDN_URL + cloudinaryImageId}
            alt = 'res-logo'
            className='res-logo'
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(', ')}</h4>
        <h4>{sla.slaString}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo}</h4>
    </div>
  )
}

RestaurantCard.propTypes = {
  resData: PropTypes.object,
}

export default RestaurantCard
