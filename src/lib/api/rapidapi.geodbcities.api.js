import { variablesRapidApi } from "../../utils/params/const.geodata.js";
import axios from "axios";

async function rapidapiGetDeparmentColombian() {
  try {
    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries/CO/regions?limit=10');
    const cities = response.data;
    return cities;
  } catch (error) {
    return false
  }
}

async function rapidapiGetCitiesAntioquiaColombian() {
  try {
    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries/CO/regions/ANT/cities?limit=10');
    const cities = response.data;
    return cities;
  } catch (error) {
    return false
  }
}

async function rapidapiGetCitiesByDeparmentIDAndCountryID(countryID, departmentID) {
  try {
    const x_RapidAPI_Key = variablesRapidApi.xrapidapikey
    const x_RapidAPI_Host = variablesRapidApi.xrapidapihost
    const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryID}/regions/${departmentID}/cities?limit=10`,
      {
        headers: {
          'X-RapidAPI-Key': x_RapidAPI_Key,
          'X-RapidAPI-Host': x_RapidAPI_Host
        }
      }
    );
    const cities = response.data;
    return cities;
  } catch (error) {
    return false
  }
}


export { rapidapiGetDeparmentColombian, rapidapiGetCitiesAntioquiaColombian, rapidapiGetCitiesByDeparmentIDAndCountryID }