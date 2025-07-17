# ⛅Weather App
A responsive weather web application which allows users to search for and monitor weather in multiple cities simultaneously. Developed as part of school assignment.

# 🔍Features
- Search by city name
- Select and add cities to personal list
- Weather dashboard with real-time information
- Card for each city in the personal list, including:
  - Name of the city
  - Current temperature
  - Weather condition
  - Background image which visually represents the current weather
 
# 🛠️Tech Stack
- React + Vite
- Testing: Vitest + Testing Library
- Mocking: MirageJS
- API: OpenWeatherMap

# 🧱Project Structure
```
Weather-test/
│── src/
│   ├── assets/            # Background images for the weather cards
│   ├── components/        # Reusable components
│   ├── mock/              # Mock weather data
│   ├── tests/             # Tests
│   ├── App.css            # Global styles
│   ├── App.jsx            # Central component, renders functionality from components
│   ├── main.jsx           # JavaScript entry point
│── # Other essential files at the root (e.g., index.html, package.json, .gitignore) which are required to run and configure the project but typically don’t need editing

```

# 🚀Installation Instructions
1. Clone the repository:
   
   ```
   git clone git@github.com:carmenjoekalda/weather-test.git
   ```
3. Install dependencies in weather-test folder:
   ```
   npm install
   ```
3. Start the development
   ```
   npm run dev
   ```
4. Start the tests
   ```
   npm run test
   ```
5. Feel free to change files in the `src` folder
