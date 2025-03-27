import { countries } from "../data/countries";
import {ChangeEvent, FormEvent, useState} from 'react'
import { SearchType } from "../types";
import Alert from "./Alert";

type FormProps = {
    fetchWeather: (search:SearchType) =>Promise<void>
}
export default function Form({fetchWeather}:FormProps) {
    const [search,setSearch]=useState<SearchType>({
        city: '',
        country: ''
    })
    const [alert,setAlert]=useState('')

     const handleChange = (e: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.name,e.target.value)
        setSearch({...search,[e.target.name]: e.target.value})
     }
     const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{

        e.preventDefault()
        if(Object.values(search).includes('')){
            console.log("Campos Vacios")
            setAlert("Todos los campos son obligatorios")
            return
        }
        setAlert('')
       fetchWeather(search)
     }
  return (
    <form className="md:w-1/3 lg:w-2/5 mx-69 my-5 p-6 rounded-lg  w-full " onSubmit={handleSubmit}>
        {alert && <Alert>{alert}</Alert>}
    <div className="mb-4">
        <label htmlFor="city" className="block text-white font-semibold"> Ciudad:</label>
        <input 
            id='city' 
            type="text" 
            name="city" 
            placeholder="Ciudad" 
            className="w-full p-2 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={search.city}
            onChange={handleChange}
        />
    </div>

    <div className="mb-4">
        <label htmlFor="country" className="block text-white font-semibold">Pais:</label>
        <select 
            id="country"
            value={search.country}
            onChange={handleChange}
            name="country" 
            className=" p-2 border border-gray-300 rounded-md bg-amber-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
            <option value="">--Seleccione un país--</option>
            {
                countries.map((country) => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                ))
            }
        </select>
    </div>

    <input 
        type="submit" 
        value='Consultar Clima' 
        className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 cursor-pointer transition duration-300"
    />
</form>

)
}
