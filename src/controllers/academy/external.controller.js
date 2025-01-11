import {
  restcountrieApiGetCountriesAmerica,
  restcountrieApiGetCountriesRegion,
  restcountrieApiGetAllCountries,
  restcountrieApiGetDatesColombia,
  restcountrieApiGetDatesCountryID
} from "../../lib/api/restcounties.cities.api.js";
import {
  rapidapiGetCitiesAntioquiaColombian,
  rapidapiGetCitiesByDeparmentIDAndCountryID,
  rapidapiGetDeparmentColombian
} from "../../lib/api/rapidapi.geodbcities.api.js";
import {
  geonamesApiGetCityOneCountry,
  geonamesApiGetCitiesColombian
} from "../../lib/api/geonames.api.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";


// RestCountries

export const getAllCountries = async (req, res) => {
  const countries = await restcountrieApiGetAllCountries();
  if (!countries) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: countries }));
}

export const getCountriesAmerica = async (req, res) => {
  const countries = await restcountrieApiGetCountriesAmerica();
  if (!countries) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: countries }));
}

export const getCountriesRegion = async (req, res) => {
  const region = req.params.region;
  const countries = await restcountrieApiGetCountriesRegion(region);
  if (!countries) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: countries }));
}

export const getDateColombian = async (req, res) => {
  const data = await restcountrieApiGetDatesColombia(req, res);
  if (!data) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: data }));
}

export const getDateCityID = async (req, res) => {
  const contryID = req.params.contryID;
  const data = await restcountrieApiGetDatesCountryID(contryID);
  if (!data) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: data }));
}


// GeoName

export const getCitiesColombianGeoNames = async (req, res) => {
  const cities = await geonamesApiGetCitiesColombian();
  if (!cities) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: cities }));
}

export const getCitiesOneCountryIDGeoNames = async (req, res) => {
  const countryID = req.params.countryID;
  const cities = await geonamesApiGetCityOneCountry(countryID);
  if (!cities) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: cities }));
}


// RapidApi

export const getDepartmentColombianRapidapi = async (req, res) => {
  const countryID = req.params.countryID;
  const cities = await rapidapiGetDeparmentColombian(countryID);
  if (!cities) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: cities }));
}

export const getCitiesOnContryAntioquiaColombiaRapidapi = async (req, res) => {
  const cities = await rapidapiGetCitiesAntioquiaColombian();
  if (!cities) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: cities }));
}

export const getCitiesOneCountryIDAndDepartmentIDRapidapi = async (req, res) => {
  const countryID = req.params.countryID;
  const departmentID = req.params.departmentID;
  const cities = await rapidapiGetCitiesByDeparmentIDAndCountryID(countryID, departmentID);
  if (!cities) return res.json(responseQueries.error({ message: "Error" }));
  return res.json(responseQueries.success({ message: "Success", data: cities }));
}
