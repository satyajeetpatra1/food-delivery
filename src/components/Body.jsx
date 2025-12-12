import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";

function Body() {
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    const API =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
    async function calling() {
      let resp = await axios.get(API);
      // console.log(resp.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants , "resp");
      setAllRestaurants(
        resp.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
      );
    }
    calling();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl m-8">
        Restaurants with online food delivery in Chhindwara
      </h1>
      <button className="border rounded-2xl ml-20 w-1/12 p-2 text-xl">
        Rating 4.4+
      </button>
      <button className="border rounded-2xl ml-2 w-1/12 p-2 text-xl">
        Reset
      </button>

      <div className="flex flex-wrap w-10/12 mx-auto">
        {allRestaurants.map((item, index) => (
          <RestaurantCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Body;
