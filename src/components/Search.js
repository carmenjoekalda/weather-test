import React, { useState } from 'react';

const Search = ({ onSelectItem }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const inputChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const buttonClickHandler = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`)
      .then((result) => result.json())
      .then((cities) => {
        setSearchResults(
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
      <input
        type="text"
        data-testid="search-input"
        value={query}
        onChange={inputChangeHandler}
      />
      <button data-testid="search-button" onClick={buttonClickHandler}>
        Search
      </button>

      <div data-testid="search-results">
        {searchResults.map((city) => (
          <div
            key={`${city.lat}-${city.lon}`}
            onClick={() => onSelectItem(city)}
          >
            {city.name}, {city.lat}, {city.lon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
