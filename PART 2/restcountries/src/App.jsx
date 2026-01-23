import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState("")
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
    const apiKey = "510a070949503c340f8e128615278680";

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`)
  .then(res => console.log(res.data));

  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null)
  }

  const Countries = ({ countries, value, selectedCountry, setSelectedCountry }) => {
  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(value.toLowerCase())
  )

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

  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
      <Countries
        countries={countries}
        value={value}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  )
}

export default App
