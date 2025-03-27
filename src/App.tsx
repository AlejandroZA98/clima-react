
import './App.css'
import Alert from './components/Alert'
import Form from './components/Form'
import Spinner from './components/Spinner'
import WeatherDetail from './components/WeatherDetail'
import useWeather from './hooks/useWeather'

function App() {
  const {weather,loading,hasWeatherData,fetchWeather,notFound} = useWeather()// uso de hook
  return (
    <>
      <h1 className='text-white text-7xl text-center font-bold mt-10'>Buscador de Clima </h1>
      <div className='flex flex-col mt-12 md:flex-row items-center gap-34  md:w-1/2   md:space-y-0 md:space-x-9'>
        <Form fetchWeather={fetchWeather} />
        {loading&& <Spinner></Spinner>}
        {notFound&& <Alert>Ciudad No Encontrada</Alert> }
        {hasWeatherData && <WeatherDetail weather={weather} />}
      </div>

    </>
  )
}

export default App
