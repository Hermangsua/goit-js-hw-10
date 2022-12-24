import './css/styles.css';
import { getCountry } from './js-api/fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');
// console.log(inputSearch);
function countrySearch(evt) {
  const inputText = inputSearch.value.trim();
  clearHtml();
  if (inputText !== '') {
    getCountry(inputText)
      .then(serverAnswer => {
        if (serverAnswer.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (2 <= serverAnswer.length && serverAnswer.length <= 10) {
          createCountriesMarkUp(serverAnswer);
          console.log('Rendercountrylist');
        } else if (serverAnswer.length === 1) {
          createOneCountryMarkUp(serverAnswer);
          console.log('Rendercountrydiv');
        } else if (serverAnswer.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }
}
inputSearch.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));
getCountry('peru');

function clearHtml() {
  countryList.innerHTML = '';
  countryDiv.innerHTML = '';
}
function createOneCountryMarkUp(countries) {
  const markUpOneCountry = countries
    .map(country => {
      return `<img src="${
        country.flags.svg
      }" alt="" width = "50"><p class="first_p">${country.name.official}</p>
      <p><span>Capital:</span>${country.capital}</p>
      <p><span>Population:</span>${country.population}</p>
      <p><span>Languages:</span>${Object.values(country.languages)}</p>`;
    })
    .join('');
  countryDiv.insertAdjacentHTML('beforeend', markUpOneCountry);
  countryDiv.style.border = 'grey solid 2px';
  countryDiv.style.display = 'inline-block';
  countryDiv.style.fontSize = '25px';
  const firstP = document.querySelector('.first_p');
  firstP.style.display = 'inline-flex';
  firstP.style.fontSize = '30px';
  firstP.style.margin = '0';
  firstP.style.paddingLeft = '25px';
  firstP.style.fontWeight = '800';
  const countryDivSpan = document.querySelectorAll('.country-info > p > span');
  for (const iterator of countryDivSpan) {
    iterator.style.fontWeight = '800';
    iterator.style.paddingRight = '25px';
  }
  // console.log(countryDivSpan);
}
function createCountriesMarkUp(countries) {
  const markUpCountry = countries
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="" width = "30">${country.name.official}</li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markUpCountry);
  countryList.style.listStyle = 'none';
  countryList.style.fontSize = '30px';
  countryList.style.margin = '0';
  const countryListImg = document.querySelector('.country-list > img');
  countryListImg.paddingLeft = '15px';
}
