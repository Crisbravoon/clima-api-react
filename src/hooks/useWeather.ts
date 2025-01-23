
import axios from 'axios';
import { z } from 'zod'

import { useMemo, useState } from 'react';

import { SearchType } from '@/types';

//ZOD Esquema
const WeatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
});

export type Weather = z.infer<typeof WeatherSchema>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
};

export const useWeather = () => {

    const [loading, setLoading] = useState(false);

    const [weather, setWeather] = useState<Weather>(initialState);

    const [notFound, setNotFound] = useState(false);

    const fetchWeather = async (search: SearchType) => {

        const apiKey = import.meta.env.VITE_API_KEY;

        setLoading(true);
        setWeather(initialState);

        try {

            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;

            const { data } = await axios.get(geoURL);

            if (!data[0]) {
                setNotFound(true);
                return
            };

            const { lat, lon } = data[0];

            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

            const { data: weatherData } = await axios.get(weatherApi);

            const result = WeatherSchema.safeParse(weatherData);

            if (result.success) {
                setWeather(result.data);
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const hasWeatherData = useMemo(() => weather.name, [weather]);

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
};
