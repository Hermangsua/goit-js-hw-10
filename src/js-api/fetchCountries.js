const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = 'name,capital,population,flags,languages';
const getCountry = (countryName = '') => {
  return fetch(BASE_URL + countryName + '?fields=' + searchParams).then(
    response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw newError(response.statusText);
      }
      return response.json();
    }
  );
};
export { getCountry };
