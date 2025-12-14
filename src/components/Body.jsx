import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Search from "./Search";

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

  const [filteredRestaurant, setFilteredRestaurant] = useState(allRestaurants);

  const [buttonClicked, setButtonClicked] = useState("");

  useEffect(() => {
    if (allRestaurants && allRestaurants.length) {
      if (buttonClicked === "filter") {
        setFilteredRestaurant(
          allRestaurants.filter(
            (restaurant) => restaurant.info.avgRating >= 4.2
          )
        );
      } else {
        setFilteredRestaurant(allRestaurants);
      }
    }
  }, [allRestaurants]);

  function handleTopRestaurant() {
    setFilteredRestaurant(
      allRestaurants.filter((restaurant) => restaurant.info.avgRating >= 4.4)
    );
    setButtonClicked("rating");
  }

  function handleReset() {
    setFilteredRestaurant(allRestaurants);
    setButtonClicked("reset");
  }

  return (
    <div>
      <h1 className="font-bold text-2xl m-8">
        Restaurants with online food delivery in Chhindwara
      </h1>
      <button
        className={`${
          buttonClicked === "rating" ? "bg-yellow-200" : ""
        } border rounded-2xl ml-20 w-1/12 p-2 text-xl cursor-pointer`}
        onClick={handleTopRestaurant}
      >
        Rating 4.4+
      </button>
      <button
        className={`${
          buttonClicked === "reset" ? "bg-yellow-200" : ""
        } border rounded-2xl ml-2 w-1/12 p-2 text-xl cursor-pointer`}
        onClick={handleReset}
      >
        Reset
      </button>

      <div>
        <Search
          setFilteredRestaurant={setFilteredRestaurant}
          allRestaurants={allRestaurants}
          setButtonClicked={setButtonClicked}
        />
      </div>

      <div className="flex flex-wrap w-10/12 mx-auto">
        {filteredRestaurant.map((item, index) => (
          <RestaurantCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Body;
