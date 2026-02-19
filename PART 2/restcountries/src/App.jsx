import { useState, useEffect } from 'react'
import axios from 'axios'
const Countries = ({ countries, value, selectedCountry, setSelectedCountry, weather, setWeather}) => {
  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(value.toLowerCase())
  )
useEffect(() => {
  const apiKey = import.meta.env.VITE_SOME_KEY
  if (selectedCountry){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${apiKey}&units=metric`).then(res => setWeather(res.data)) 
  }
  }, [selectedCountry])

  if (selectedCountry) {
    const country = selectedCountry
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>

        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <h2>Weather in {country.capital}</h2>
        <p>Temperature {weather?.main?.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/w/${weather?.weather?.[0]?.icon}.png`} alt={`${weather?.weather?.[0]?.main}`} />
        <p>Wind {weather?.wind?.speed} m/s</p>
        {console.log(weather)}
      </div>
    )
  }

  if (filtered.length === 1) {
    setSelectedCountry(filtered[0])
    return null
  }

  if (filtered.length > 5) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <div>
      {filtered.map(country => (
        <p key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </p>
      ))}
    </div>
  )
}
const App = () => {
  const [value, setValue] = useState("")
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))

  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null)
  }

  
  return (
    <div>
      
      find countries <input value={value} onChange={handleChange} />
      <Countries
        countries={countries}
        value={value}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  )
}

export default App
