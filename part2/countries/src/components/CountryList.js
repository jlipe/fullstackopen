import React from 'react';

const CountryList = ({ countries, handleCountrySelect }) => {
    const renderedCountries = countries.map((country, index) => {
        return(
            <div key={country.numericCode}>
                {country.name} <button onClick={handleCountrySelect} value={index}>Show</button>
            </div>
        )
    });

    return(
        <div>
            {renderedCountries}
        </div>
    );
}

export default CountryList;