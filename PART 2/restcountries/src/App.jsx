import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [value, setValue] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (!value) return
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data)
    }).catch(error =>{

    })
  }, [value])
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const Countries = ({countries}) => {
    return(
      countries.map(country => country.name.common.toLowerCase().includes(value.toLowerCase()) ?
      <p key={country.id}>{country.name.common}</p>: null
    )
    )
  }
  return(
    <div>
        find countries <input value={value} onChange={handleChange} />
        <Countries countries={countries}/>
    </div>
  )
}

export default App