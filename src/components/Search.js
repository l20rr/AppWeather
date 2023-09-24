import { searchCity } from '../Api';
import React,{useState} from 'react'

const SearchBar = () => {
    const [search, setSeacrh] = useState({}); 
    const [City, setCity] = useState("");
    const [mostrarDivBuscar, setMostrarDivBuscar] = useState(false);
    const [cityImages, setCityImages] = useState(null);

    const onChangeHandler = (e) => {
      setSeacrh(e.target.value);
    };
  
    const onButtonClickHandler = () => {
      onSearchHandle(search);
    };
  
    const onSearchHandle = async (City) => {
      try {
        const weatherResult = await searchCity(City);
        setCity(weatherResult);
  
        if (weatherResult.name) {
          const images = await cityimg(weatherResult.name);
          setCityImages(images);
          console.log(images);
        } else {
          console.log("City not found");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
  
    const showinput = () => {
      setMostrarDivBuscar(true);
    };
  
    const cityimg = async (cityName) => {
      try {
        let url = `https://api.teleport.org/api/urban_areas/slug:${cityName.toLowerCase()}/images/`;
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        console.log("error: ", error);
      }
    };
  



  return (
    <div id='geral'>
    {cityImages && cityImages.photos && cityImages.photos.length > 0 && (
      <img id='city' src={cityImages.photos[0].image.web} alt="Imagem da cidade" />
    )}
       
    <div className="app">
    
  
        <div className='container'>
          <div className="location">
            <h1>{City.name}</h1>
          </div>
         <div className="temp">
            {City.main ? <h2>Temp: {Math.round(City.main.temp - 273.15) }°C</h2> : null}
          </div>
          <div className="description">
            {City.weather ? 
            <>
            <h2>{City.weather[0].main}</h2> 
            <img  src={`https://openweathermap.org/img/wn/${City.weather[0].icon}@2x.png`} alt="Weather Icon" />
            </>
            : null}
         
          </div>
     
        </div>
        <div className='info'>
      <div className='serachflg'>
      {mostrarDivBuscar && (
        <div id="buscar">
          <input placeholder='ex: London' onChange={onChangeHandler} />
          <button onClick={onButtonClickHandler}>Buscar</button>
        </div>
      )}
      {
  City.sys ? (
        <img src={`https://flagsapi.com/${City.sys.country}/flat/64.png`}></img>
  ): null
}
      </div>
        {City.main ? (
          <div className='square'>
    <p>Temp Máxima:<h4> {Math.round(City.main.temp_max - 273.15)}°C </h4></p>
    <p>Temp Mínima:<h4>  {Math.round(City.main.temp_min - 273.15)}°C </h4></p>
    <p>Sensação Térmica:<h4>  {Math.round(City.main.feels_like - 273.15)}°C </h4></p>
    <p>Umidade: <h4> {City.main.humidity}% </h4></p>
  </div>
) : null}


    
    <div id='btn1'>
       
    <button onClick={showinput}>escolher</button>

    </div>
     
    </div>
    </div>
    </div>
  );
}

export default SearchBar;
