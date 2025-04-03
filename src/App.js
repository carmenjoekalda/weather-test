import { useState } from 'react';
import './App.css';
import { createMockServer } from './createMockServer';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import SelectedCities from './components/SelectedCities';

if (process.env.NODE_ENV === 'development') {
  createMockServer();
}

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const selectedCity = (city) => {
    setSelectedCities([city, ...selectedCities]);
  };

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <Search onSearchResults={setSearchResults} />
      <SearchResults searchResults={searchResults} onSelectCity={selectedCity} />
      <SelectedCities selectedCities={selectedCities} />
    </div>
  );
}

export default App;