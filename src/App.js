import axios from 'axios';
import { useState } from 'react';
import { IntegrifyWeather } from './component/IntegrifyWeather'

function App() {

  // states
  const [citySearch, setCitySearch] = useState('');
  const [cityData, setCityData]=useState(null);

  // city search form
  const fetchCity = (e) =>{
    e.preventDefault();
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=reKfa15ZQrq377rnVWGSaBdkaYSzA3TO=${citySearch}`)
    .then((res)=>{
      setCityData(res.data[0]);
      setCitySearch('');
    }).catch(err=>console.log(err.message));
  }

  return (
    <div className="wrapper">
      <h1 className="headline">AccuWeather API</h1>
      <form className='form-group custom-form' autoComplete='off'
      onSubmit={fetchCity}>
        <label>Search for a city to get weather forecast</label>
        <div className='search-box'>
          <input className='form-control' required placeholder='Enter the name of a city'
          value={citySearch} onChange={(e)=>setCitySearch(e.target.value)}/>
          <button type='submit' className="btn btn-secondary btn-sm">
            {/* <Icon icon={search} size={22}/> */}
            Show weather Info
          </button>
        </div>
      </form>
      {cityData&& <div style={{padding:10+'px', width: 100+'%'}}><IntegrifyWeather cityData={cityData}/></div>}
    </div>
  );
}

export default App;