import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
    const [currentWeather, setCurrentWeather] = useState(null);

    const api_keys = process.env.REACT_APP_API_KEY;

    const renderedLanguages = country.languages.map(language => {
        return(
            <li key={language.iso639_1}>{language.name}</li>
        );
    });

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_keys}&query=${country.name}&units=f`)
          .then(response => {
            setCurrentWeather(response.data.current);
          })
      }, [api_keys, country.name]);

    let renderedWeather = null;
    if (currentWeather) {
        renderedWeather = (
            <div>
                <h4>Weather in {country.capital}</h4>
                <div>
                    <img
                        alt={currentWeather.weather_descriptions}
                        src={currentWeather.weather_icons[0]}>
                    </img>
                </div>
                <b>Temperature: {currentWeather.temperature} Farenheight</b><br/>
                <b>Wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</b>
            </div>
        )
    }

    return(
        <div>
            <h4>{country.name}</h4>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <ul>
                {renderedLanguages}
            </ul>
            <img
                    alt={country.name} 
                    src={country.flag}
                    style={{width: "300px"}}>
            </img>
            {renderedWeather}
        </div>

    );
}

export default Country;