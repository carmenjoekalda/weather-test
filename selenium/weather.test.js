import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function runSearchTests() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    try {
        await driver.get('http://localhost:5173');

        // Test input and button existence
        const input = await driver.wait(until.elementLocated(By.css('[data-testid="search-input"]')), 5000);
        const button = await driver.findElement(By.css('[data-testid="search-button"]'));
        console.log('Input exists (expected "true")?', !!input);
        console.log('Button text (expected "Search"):', await button.getText());

        // Test input value update on typing
        await input.sendKeys('Melbourne');
        const value = await input.getAttribute('value');
        console.log('Input value after typing (expected "Melbourne"):', value);

        // Test search results
        await button.click();
        const results = await driver.wait(
            until.elementsLocated(By.css('[data-testid="search-results"] .search-result')),
            5000
        );
        console.log('Number of results (expected "5"):', results.length);

        // Test weathercard data
        await results[0].click();
        await delay(1000);
        const cityName = await driver.findElement(By.tagName('h3')).getText();
        const temperature = await driver.findElement(By.xpath('.//p[1]')).getText();
        const mainWeather = await driver.findElement(By.xpath('.//p[2]')).getText();
        console.log('WeatherCard city name (expected "Melbourne"):', cityName);
        console.log('WeatherCard temperature (expected "30.48"):', temperature);
        console.log('WeatherCard main weather (expected "Clouds"):', mainWeather);

    } finally {
        await driver.quit();
    }
}

runSearchTests();