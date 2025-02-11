/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'


const Weather = () => {

    const inputRef = useRef()

    const [weatherData , setWeatherData] = useState(false)
    const allIcons = {
        "01d" : clear_icon , 
        "01n" : clear_icon ,
        "02d" : cloud_icon , 
        "02n" :cloud_icon ,
        "03d" :cloud_icon ,
        "03n" :cloud_icon ,
        "04d" :cloud_icon ,
        "04n" :cloud_icon ,
        "09d" : drizzle_icon ,
        "09n" :drizzle_icon ,
        "10d" :drizzle_icon ,
        "10n" :drizzle_icon ,
        "13d" : snow_icon ,
        "13n" : snow_icon

        
    }

    const search = async(city)=>{
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location : data.name,
                icon : icon

            })


        }catch(error){
            
        }
    }


  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search'/>
            <img src={search_icon} className='imgSearch' onClick={()=>search(inputRef.current.value)}/>
        </div>
        <img src={weatherData.icon} className='weather-icon'/>
        <p className='tempurature'>{weatherData.temperature}</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon}/>
                <div>
                    <p>{weatherData.humidity}</p>
                    <span>Humidity</span>
                    </div>
            </div>
            <div className='col'>
                <img src={wind_icon}/>
                <div>
                    <p>{weatherData.windSpeed}</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
