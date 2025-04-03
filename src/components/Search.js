import React, { useState } from 'react';

function Search({ onSearchResults }) {
  const [query, setQuery] = useState('');

  const inputChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const buttonClickHandler = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`)
      .then((result) => result.json())
      .then((cities) => {
        onSearchResults(
          cities.map((city) => ({
            name: city.name,
            country: city.country,
            lat: city.lat,
            lon: city.lon,
          }))
        );
      });
  };

  return (
    <div>
      <input type="text" data-testid="search-input" onChange={inputChangeHandler} />
      <button data-testid="search-button" onClick={buttonClickHandler}>Search</button>
    </div>
  );
}

export default Search;