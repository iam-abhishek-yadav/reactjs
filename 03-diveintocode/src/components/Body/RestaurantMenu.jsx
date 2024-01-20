import { useEffect, useState } from "react"
import { RES_MENU_URL } from "../../utils/constants"
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
    const [itemCards, setItemCards] = useState([]);
    const {resId} = useParams()
    useEffect(() => {
        const fetchData = async() => {
            const resp = await fetch(`${RES_MENU_URL}/${resId}`);
            const jsonData = await resp.json();
            setItemCards(jsonData);
            console.log(jsonData);
        }
        fetchData()
    }, [])  
    if(itemCards.length === 0 ) return <Shimmer />;
    const [resHead, resMenu] = [itemCards?.data?.cards[0]?.card?.card?.info, itemCards?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards]
  return ( 
    <div className="res">
        <div className="res-header">
            <div className="res-header-name">{resHead.name}</div>
            <div className="res-header-cuisine">{resHead.cuisines.join(',')}</div>
        </div>
        <br /><hr /><hr /><br />
      <div className="menu">
        {resMenu?.map((itemCard) => (
            <div key={itemCard?.card?.info?.id}>
            <div>{itemCard?.card?.info?.name} - Rs. {(itemCard?.card?.info?.price)/100}</div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantMenu
