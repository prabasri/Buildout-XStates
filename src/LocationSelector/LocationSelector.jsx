import React, { useEffect, useState } from "react";
import styles from './LocationSelector.module.css';

export const LocationSelector = () => {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  
  const getCountries = async() => {
    try {
      const response = await fetch("https://crio-location-selector.onrender.com/countries");
      const data = await response.json();
      // setCountries(response.json());
      setCountries(data);

    } catch(error) {
      console.error("Error:", error)
    }
  }

  const getStates = async() => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
      const data = await response.json();
      setStates(data);

    } catch(error) {
      console.error("Error:", error)
    }
  }

  const getCities = async() => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
      const data = await response.json();
      setCities(data);

    } catch(error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if(selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if(selectedState && selectedCountry) {
      getCities();
    }
  }, [selectedState, selectedCountry]);

  // console.log(countries);
  // console.log(states);
  // console.log(cities);
  // console.log(selectedCountry);
  // console.log(selectedState);
  // console.log(selectedCity);

  
  return (
    <div>
      <h1>Select Location</h1>
      <select 
        value={selectedCountry} 
        className={styles.dropdown} 
        onChange={e => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>

        {countries.map((country) => {
          return (
            <option key={country} value={country}>{country}</option>
          );
        })}

      </select>

      <select 
        value={selectedState} 
        onChange={e => setSelectedState(e.target.value)} 
        disabled={!selectedCountry}
        className={styles.dropdown}
      >
        <option value="">Select State</option>

        {states.map((state) => {
          return (
            <option key={state} value={state}>{state}</option>
          );
        })}

      </select>

      <select 
        value={selectedCity} 
        onChange={e => setSelectedCity(e.target.value)}
        disabled={!selectedState}
        className={styles.dropdown}
      >
        <option value="">Select City</option>

        {cities.map((city) => {
          return (
            <option key={city} value={city}>{city}</option>
          );
        })}

      </select>
      {
      selectedCity && 
        <h3>You selected 
          <span className={styles.cityText}>{" "}{selectedCity}{", "}</span>
          <span className={styles.fadedText}>{selectedState}, {selectedCountry}</span>
        </h3> 
      }
    </div>
  )
}
