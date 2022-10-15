import React, { useEffect, useState } from "react";
import axios from "axios";
import sunny from '../images/01-sunny.png';
import mostlycloudy from '../images/06-mostlycloudy.png';
import cloudy from "../images/07-cloudy.png";
import tstorms from "../images/15-tstorms.png";
import rain from "../images/18-rain.png";
import clear from "../images/33-clear.png";
import partlycloudy from "../images/35-partlycloudy.png";
import showers from "../images/12-showers.png";

import { PushSpinner } from "react-spinners-kit";

export const IntegrifyWeather = ({ cityData }) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setLoading(true);
    axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityData.Key}?apikey=reKfa15ZQrq377rnVWGSaBdkaYSzA3TO`)
      .then((res) => {
        setData(res.data.DailyForecasts[0]);
        console.log(res.data);
        setLoading(false);
      }).catch((err)=>console.log(err,"--------forecast weather error----"));
  }, [cityData.Key]);

  return (
    <>
      {data&&(
        <main className="current-conditions-box">
          <h3 className="city-country">
            {cityData.EnglishName} {cityData.Country.EnglishName}
          </h3>
          <div className="details">
            <h2 className="temperature-value"> 
              {Math.ceil(data.Temperature.Minimum.Value)}
              <sup className="deg">&deg;{data.Temperature.Minimum.Unit}</sup> 
              </h2>
              <h2 className="temperature-value">
              {Math.ceil(data.Temperature.Maximum.Value)}
              <sup className="deg">&deg;{data.Temperature.Maximum.Unit}</sup> 
            </h2>
            {data.Day.Icon===1&&<img className="weather-img" src={sunny} alt="sunny"/>}
            {data.Day.Icon===6&&<img className="weather-img" src={mostlycloudy} alt="mostlycloudy"/>}
            {data.Day.Icon===7&&<img className="weather-img" src={cloudy} alt="cloudy"/>}
            {data.Day.Icon===15&&<img className="weather-img" src={tstorms} alt="tstorms"/>}
            {data.Day.Icon===18&&<img className="weather-img" src={rain} alt="rain"/>}
            {data.Day.Icon===33&&<img className="weather-img" src={clear} alt="clear"/>}
            {data.Day.Icon===35&&<img className="weather-img" src={partlycloudy} alt="partlycloudy"/>}
            {data.Day.Icon===12&&<img className="weather-img" src={showers} alt="showers"/>}

            <p className="weather-text">{data.Day.IconPhrase}</p>
          </div>
        </main>
      )}
      {!data&&<div className='loader-box'>
        {/* <ClipLoader color="#fff" loading={loading} size={50} /> */}
        <PushSpinner size={30} color="#fff" loading={loading} />
        </div>}
    </>
  );
};