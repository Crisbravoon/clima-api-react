

import styles from '../module/WeatherDetails.module.css';
import { formatTemperature } from "../../helpers";
import { Weather } from "../../hooks/useWeather";


type WeatherProps = {
    weather: Weather,
};

export const WeatherDetails = ({ weather }: WeatherProps) => {
    return (
        <div className={styles.container}>
            <h2>{weather.name} 🏙️</h2>
        <p className={styles.current}>🌡️{formatTemperature(weather.main.temp)}&deg;C</p>
        <div className={styles.temp}>
            <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
            <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
        </div>
        </div>
    )
};

export default WeatherDetails