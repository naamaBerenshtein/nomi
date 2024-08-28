import React, { useEffect, useState } from "react";
import './style.css';

const WeatherCard = ({ historyWeatherData }) => {
    const [hourlyTemperatures, setHourlyTemperatures] = useState([]);

    useEffect(() => {
        const fetchHourlyTemperatures = () => {
            const currentHour = new Date(historyWeatherData.location.localtime).getHours();
            const hourlyData = historyWeatherData.forecast.forecastday[0].hour;
            const hours = [currentHour - 3, currentHour - 2, currentHour - 1, currentHour, currentHour + 1].filter(h => h >= 0 && h < 24);
            const hourlyTemps = hours.map(h => ({
                hour: h,
                temp: hourlyData[h].temp_c + '°'
            }));

            setHourlyTemperatures(hourlyTemps);
        };

        fetchHourlyTemperatures();
    }, [historyWeatherData]);
    const { region, country, localtime } = historyWeatherData.location;
    const dateParts = localtime.split(" ");
    const date = new Date(dateParts[0]);
    const localtimeString = `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(2)} at ${dateParts[1]}`;
    const todayForecast = historyWeatherData.forecast.forecastday[0].hour[0];
    const { humidity, precip_mm, wind_kph } = todayForecast;
    const { temp_c } = historyWeatherData.current
    const { text } = todayForecast.condition
    return (
        <>
            <div className="weather-card">
                <div className="weather-content">
                    <h1> {region}</h1>
                    <h2>{country}
                        <p className="location"> {localtimeString}</p>
                    </h2>
                    <div className="temperature">
                        <div><span>{temp_c}°</span>
                            <p className="condition">{text}</p>
                        </div>
                    </div>
                    <div className="details">
                        <div>
                            <p className="text1">precipitation</p>
                            <p className="text2">{precip_mm} mm</p>
                        </div>
                        <div>
                            <p className="text1">humidity</p>
                            <p className="text2">{humidity}%</p>
                        </div>
                        <div>
                            <p className="text1">wind</p>
                            <p className="text2">{wind_kph} km/h</p>
                        </div>
                    </div>
                    <div className="hourly-forecast">
                        {hourlyTemperatures.map(({ hour, temp }) => (
                            <div key={hour}>
                                <p className="clock1">{hour}:00</p> <p className="clock2">{temp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );

};
export default WeatherCard