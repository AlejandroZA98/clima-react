import axios from 'axios'
import { SearchType } from '../types'
import {z} from 'zod'
import { useMemo, useState } from 'react'
//import {object,string,number,Output,parse} from 'valibot'

// funcion para validar el type de la respuesta del api
// function isWeatherResponse(weather:unknown):weather is Weather{// tipo desconocido
//     return(
//         Boolean(weather)&&
//             typeof weather==='object'&&
//             typeof (weather as Weather).name==='string'&&
//             typeof (weather as Weather).main.temp==='number'&&
//             typeof (weather as Weather).main.temp_max==='number'&&
//             typeof (weather as Weather).main.temp_min==='number'    
//         )
// }

//Zod schema
export const Weather=z.object({ //type de Weather con zod
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})
export type Weather=z.infer<typeof Weather>

//Valibot Schema
// const WeatherShema= object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })
// type Weather = Output<typeof WeatherShema>;

const initialState={
    name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        } 
}
export default function useWeather(){
    const [weather,setWeather]=useState<Weather>(initialState)
    const [loading,setLoading] = useState(false)
    const[notFound,setNotFound] = useState(false)

    const fetchWeather= async(search:SearchType)=>{
        const AppId=import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        try{
            const geoUrl=`https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${AppId}`
            const {data}= await axios.get(geoUrl)
            console.log(data[0])
            if(!data[0]){
                console.log("Clima no encontrado")
                setNotFound(true)
                return
            }
            const lat=data[0].lat
            const lon=data[0].lon
            setNotFound(false)

            //console.log(lat,lon)
            const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${AppId}`
            //console.log(weatherUrl)

            //const {data:weatherRestult}= await axios.get<Weather>(weatherUrl)// casting de type (asignar valor)
            // console.log(weatherRestult)
            // console.log(weatherRestult.main.temp_max)
            // console.log(weatherRestult.name)

            //Type Guards
            // const {data:weatherRestult}= await axios.get(weatherUrl)
            // const result=isWeatherResponse(weatherRestult)
            // console.log(result)
            // if(result){
            //     console.log(weatherRestult)
            // }

            // Libreria Zod
            const {data:weatherRestult}= await axios.get(weatherUrl)
            const result=Weather.safeParse(weatherRestult)// safeparse toma el resultado de la consulta y revisa si coincide con el schema zod
            if(result.success){
                console.log(result.data)
                setWeather(result.data)
                
            }else{
                console.log('Error en la validacion de datos')
            }

            // Valibot
            // const {data:weatherRestult}= await axios.get(weatherUrl)
            // const result= parse(WeatherShema,weatherRestult)
            // console.log(result)
            // if(result){
            //     console.log(result.name)
            // }else{
            //     console.log('Error en la validacion de datos')
            // }

        }catch(error){
            console.log(error)
            
        }finally{
            setLoading(false)

        }
    }
    const hasWeatherData = useMemo(()=>weather.name,[weather])      

    return {
        fetchWeather,
        weather,
        hasWeatherData,
        loading,
        notFound
    }
}