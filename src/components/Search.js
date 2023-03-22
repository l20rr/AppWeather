import { searchCity } from '../Api';
import React,{useState} from 'react'

const SearchBar = () => {
    const [search, setSeacrh] = useState({}); 
    const [City, setCity] = useState("");

    const onChangeHandler = (e)=>{
     
        setSeacrh(e.target.value)
    }

    const onButtonClickHandler = () => {
        onSearchHandle(search)
    }

    const onSearchHandle  = async (City) => {
        const result = await searchCity(City)
        setCity(result)
        console.log(result)
      }

  return (
    <div className="app">
      <br/>
      <br/>
   
        <div className="top">
            <input placeholder='ex : Lodon' onChange={onChangeHandler} />
            <button onClick={onButtonClickHandler} >Buscar</button>
        </div>
        
        <div className='container'>
          <div className="location">
            <h1>{City.name}</h1>
          </div>
          <div className="temp">
            {City.main ? <h3>Temp: {Math.round(City.main.temp - 273.15) }°C</h3> : null}
          </div>
          <div className="description">
            {City.weather ? <h2>{City.weather[0].main}</h2> : null}
          </div>
        </div>
      
    </div>
  );
}

export default SearchBar;
