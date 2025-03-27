import { Weather } from '../hooks/useWeather'
import { formatTemperature } from '../utils'
type WeatherDetailProps ={
    weather: Weather
}
export default function WeatherDetail({weather}: WeatherDetailProps) {
  return (
  <>
            <div className=''>

                <h1 className='text-white '>Clima de:</h1>
                <p className=' font-semibold text-5xl text-white'>{weather.name}</p>

                <p className=' font-semibold text-2xl text-white'>{formatTemperature( weather.main.temp).toFixed()} °C</p>
                <div>
                    <p className='font-semibold text-2xl text-white'>Min: <span>{formatTemperature(weather.main.temp_min).toFixed()} °C</span></p>
                    <p className='font-semibold text-2xl text-white'>Max: <span>{formatTemperature(weather.main.temp_max).toFixed()} °C</span></p>

                </div>
            </div>
  </>
)
}
