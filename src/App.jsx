import { useState } from 'react'
import './App.css'

import Search from './components/Search';
import WeatherCard from './components/WeatherCard'
import { createMockServer } from './createMockServer';

if (process.env.NODE_ENV === "development") {
  createMockServer()
}

function App() {
  const [selected, setSelected] = useState([])

  const selectCity = (city) => {
    setSelected([city, ...selected])
  }

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <Search onSelectCity={selectCity} />

      <div data-testid="my-weather-list">
        {selected && selected.map((city) =>
          <WeatherCard key={`${city.lat}-${city.lon}`} city={city} />
        )}
      </div>
    </div>
  );
}

export default App