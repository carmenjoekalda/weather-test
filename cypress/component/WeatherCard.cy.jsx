import React from 'react';
import WeatherCard from '../../src/components/WeatherCard';

describe('<WeatherCard />', () => {
  const mockCity = {
    name: 'Melbourne',
    lat: -37.8142454,
    lon: 144.9631732,
    country: 'AU'
  };

  const mockWeatherResponse = {
    main: {
      temp: 30.48
    },
    weather: [
      {
        main: 'Clouds',
        description: 'few clouds',
        icon: '02d'
      }
    ]
  };

  it('renders city name and fetches weather data', () => {
    cy.intercept(
      'GET',
      `http://api.openweathermap.org/data/2.5/weather?q=${mockCity.name}`,
      {
        statusCode: 200,
        body: mockWeatherResponse
      }
    ).as('getWeather');

    cy.mount(<WeatherCard city={mockCity} />);
    cy.wait('@getWeather');

    cy.get('.weather-container').within(() => {
      cy.contains('Melbourne');
      cy.contains('30.48');
      cy.contains('Clouds');
    });
  });

  it('shows placeholder text before weather loads', () => {
    cy.mount(<WeatherCard city={mockCity} />);
    cy.get('.weather-container').within(() => {
      cy.contains('Melbourne');
      cy.contains('-/-');
    });
  });
});