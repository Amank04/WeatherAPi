// Import necessary modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Create Express app
const app = express();
const port = 3000;
const API_KEY = "64e2bca2adb094ecaa1a2568cae96906";

// Set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define routes
app.get("/",async (req, res) => {
    const cityID = 1271175;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${API_KEY}`);
        
        // Check if the response has the expected structure
        
            const weatherData = response.data;
            
            // console.log(weatherData);

            // Handle the response and send it back to the client
            res.render("index.ejs", {
                city:weatherData.city.name ||  "waiting for data .. ",
                country: weatherData.city.country,
                main: weatherData.list[8].weather[0].main ,
                description: weatherData.list[8].weather[0].description,
                temperature: (weatherData.list[8].main.temp-273).toPrecision(4),
                humidity: weatherData.list[8].main.humidity
            });
});

app.post("/get-weather", async (req, res) => {
    try {
        const cityName= req.body.city;
        console.log(cityName);

        // console.log('Received location data:', lon, lat);
        console.log("I am backend server.")
        // Use async/await to handle asynchronous API request
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`);
        
        // Check if the response has the expected structure
        
            const weatherData = response.data;
            
            // console.log(weatherData);

            // Handle the response and send it back to the client
            res.render("index.ejs", {
                city:weatherData.city.name,
                country: weatherData.city.country,
                main: weatherData.list[8].weather[0].main ,
                description: weatherData.list[8].weather[0].description,
                temperature: (weatherData.list[8].main.temp-273).toPrecision(4),
                humidity: weatherData.list[8].main.humidity
            });
        
    } catch (error) {
        res.render("index.ejs", {
            city:"City not found...",
            country: "Country not found...",
            main: "No data available..." ,
            description: "No data available...",
            temperature: "No data available...",
            humidity: "No data available...",
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
