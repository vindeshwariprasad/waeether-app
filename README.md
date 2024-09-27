# Weather Forecast Application


A responsive and user-friendly weather forecast application built with HTML, Tailwind CSS, and JavaScript. It allows users to search for current weather conditions and a 5-day forecast for any city. Additionally, users can fetch weather data based on their current geographical location. The application maintains a list of recently searched cities for quick access.

Features

- Search by City: Enter any city name to retrieve current weather data and a 5-day forecast.
- Use Current Location: Fetch weather data based on your device's current geographical location.
- 5-Day Forecast: View detailed weather forecasts for the next five days, including temperature, wind speed, and humidity.
- Recently Searched Cities: Access your last five searched cities from a dropdown menu for quick retrieval.
- Responsive Design: Optimized for desktops, tablets, and mobile devices.
- Error Handling: Alerts when an invalid city name is entered or if there's an issue fetching data.



Technologies Used

- HTML5: Structure of the application.
- Tailwind CSS: Styling and responsive design.
- JavaScript (ES6): Functionality and interactivity.
- OpenWeatherMap API: Fetching current weather and forecast data.
- LocalStorage: Storing recently searched cities.

Installation

1. Clone the Repository:

   
   git clone https://github.com/yourusername/weather-forecast-app.git
   

2. Navigate to the Project Directory:

   
   cd weather-forecast-app
  

3. Obtain an OpenWeatherMap API Key:

   - Sign up at (https://openweathermap.org/) to obtain a free API key.

4. Configure the API Key:

   - Open `app.js` and replace `'your_openweather_api_key'` with your actual API key.

   
   const apiKey = 'your_openweather_api_key'; // Replace with your actual API key
  

5. Open the Application:

   - You can open `index.html` directly in your web browser or use a local development server.

   **Using Live Server in VSCode:**

   - Install the (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
   - Right-click on `index.html` and select **Open with Live Server**.

Usage

1. Search for a City:

   - Enter the name of a city in the search input field.
   - Click the **Search** button or press Enter.
   - The current weather and 5-day forecast for the entered city will display.

2. Use Current Location:

   - Click the **Use Current Location button.
   - Allow the browser to access your location.
   - The application will display weather data based on your current location.

3. Recently Searched Cities:

   - After searching for cities, they will appear in the Recently Searched Cities dropdown.
   - Select a city from the dropdown to quickly view its weather data.

4. Error Handling:

   - If an invalid city name is entered, an alert will prompt you to enter a valid city.

 Project Structure


weather-forecast-app/
├── index.html
├── app.js
├── style.css
├── README.md


- index.html: The main HTML file containing the structure of the application.
- app.js: JavaScript file handling the application's functionality and API interactions.
- style.css: (Optional) Custom CSS styles if needed.




