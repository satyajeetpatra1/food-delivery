function Search({ allRestaurants, setFilteredRestaurant, setButtonClicked }) {
  function handleSearch(searchedText) {
    setButtonClicked("");
    setFilteredRestaurant(
      allRestaurants.filter((restaurant) =>
        restaurant.info.name.toLowerCase().includes(searchedText.toLowerCase())
      )
    );
  }

  return (
    <div>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        className="border p-2 my-2 rounded"
        placeholder="Search Here"
      />
    </div>
  );
}

export default Search;
