import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import feels_like_icon from "../assets/temperature-feels-like.png";
import current_location_icon from "../assets/current_location.png";



const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                actual: data.main.feels_like,
                description: data.weather[0].description,
                icon: icon,
                dateTime: new Date((data.dt + data.timezone) * 1000).toLocaleString("en-US", {
                    timeZone: "UTC",
                }),

                });

            } catch (error) {
                setWeatherData(false);
                console.error("Error in fetching the weather data")
            }
        }

    useEffect(() => {
            search("Boston");
        }, [])


        return (

            <div className="app">
                <div className="weather">
                    <div className="search-bar">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search" />
                        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />

                    </div>

                    {weatherData ? <>

                        <img src={weatherData.icon} alt="" className="weather-icon" />
                        <p className="temperature">{weatherData.temperature} °F</p>
                        <p className="location">{weatherData.location}</p>
                        <p className="date-time">{weatherData.dateTime}</p>

                        <div className="weather-data">
                            <div className="col">

                                <div >
                                    <img src={humidity_icon} alt="" />
                                    <p>{weatherData.humidity} %</p>
                                    <span>Humidity</span>

                                    <img src={feels_like_icon} alt="" />
                                    <p>{weatherData.actual} °F</p>
                                    <span>Real Feel</span>
                                </div>

                            </div>


                            <div className="col">

                                <div>
                                    <img src={wind_icon} alt="" />
                                    <p>{weatherData.windSpeed} mph</p>
                                    <span>Wind</span>

                                    <img src={current_location_icon} alt="" />
                                    <p>{weatherData.description}</p>
                                    <span>Current Status</span>
                                </div>
                            </div>
                        </div>

                    </> : <></>}

                </div>
            </div>

        )
    }


    export default Weather