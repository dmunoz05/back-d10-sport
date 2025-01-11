import { variablesGeoNames } from "../../utils/params/const.geodata.js";
import axios from "axios";

async function geonamesApiGetCitiesColombian() {
  try {
    const username = variablesGeoNames.username
    const response = await axios.get(`http://api.geonames.org/searchJSON?country=CO&featureCode=PPL&maxRows=1000&username=${username}`);
    const cities = response.data.geonames.flatMap(citie => ({
      city: citie.name
    }));
    return cities;
  } catch (error) {
    return false
  }
}

async function geonamesApiGetCityOneCountry(countryID) {
  try {
    const username = variablesGeoNames.username
    const response = await axios.get(`http://api.geonames.org/searchJSON?country=${countryID}&featureCode=PPL&maxRows=1000&username=${username}`);
    const cities = response.data.geonames.flatMap(citie => ({
      city: citie.name
    }));
    return cities;
  } catch (error) {
    return false
  }
}

export { geonamesApiGetCitiesColombian, geonamesApiGetCityOneCountry }