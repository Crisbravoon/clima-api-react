
import style from './App.module.css'
import Alert from './components/Alert/Alert.tsx'
import Form from './components/Form/Form.tsx'
import { Spinner } from './components/Spinner/Spinner'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'
import { useWeather } from './hooks/useWeather'

function App() {

  const { notFound, fetchWeather, loading, weather, hasWeatherData } = useWeather()
  return (
    <>
      <h1 className={style.title}>🌤️ Buscador de Clima 🌤️</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
          {loading && <Spinner/>}
          {hasWeatherData && <WeatherDetails weather={weather} />}
          {notFound && <Alert> Ciudad no encontrada</Alert>}
      </div>

    </>
  )
}

export default App
