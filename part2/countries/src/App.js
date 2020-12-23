import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Country from './components/Country';
import SearchBox from './components/SearchBox';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);


  let filteredCountries;
  if (!selectedCountry){
    filteredCountries = countries.filter(country => {
      return country.name.toLowerCase().includes(searchTerm);
    });
  }
  if (filteredCountries && filteredCountries.length === 1) {
    setSelectedCountry(filteredCountries[0]);
  }

  const handleChange = (event) => {
    setSelectedCountry(null);
    setSearchTerm(event.target.value.toLowerCase());
  }

  const handleCountrySelect = (event) => {
    setSelectedCountry(filteredCountries[event.target.value]);
  }

  const handleFocus = () => {
    setSelectedCountry(null);
  }

  let countryInfo;

  if (!searchTerm) {
    countryInfo = "";
  } else if (filteredCountries && filteredCountries.length > 10 && searchTerm) {
    countryInfo = "Too many searches, specify filter";
  } else if (selectedCountry) {
    countryInfo = <Country country={selectedCountry}/>
  } else {
    countryInfo = <CountryList countries={filteredCountries} handleCountrySelect={handleCountrySelect} />
  }

  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data);
      })
  }, []);



  return(
    <div>
      <SearchBox handleChange={handleChange} handleFocus={handleFocus} />
      {countryInfo}
    </div>
  );
}

export default App;
