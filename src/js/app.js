import debounce from 'lodash.debounce';
import countryCard from './countryCard';
import request from './request';
import spinner from './spinner';
import autocopmlete from './autocopmlete';
import localData from './localData';

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const btnClearInput = document.getElementById('clear-input');
const logo = document.getElementById('logo');
const app = document.getElementById('app');

let countries = [];
let numberItems = 0;


const clearmatchList = () => {
  matchList.innerHTML = '';
};

const clearInput = () => {
  search.value = '';
  search.placeholder = 'Enter country...';
  clearmatchList();
};

const changeInput = (value) => {
  const countryName = value.replace(/\[.*?\]/, '');
  clearInput();
  search.placeholder = countryName;
  countryCard(countryName);
};

const infiniteScroll = () => {
  if (!countries.status) {
    const countriesPart = countries.slice(0, numberItems);
    matchList.innerHTML = autocopmlete(countriesPart);
    document.querySelectorAll('.card-autocomplete').forEach((item) => {
      item.addEventListener('click', () => changeInput(item.children[1].innerText));
    });
  } else {
    matchList.innerHTML = autocopmlete(countries);
  }
};

const searchCountry = async (searchValue, type) => {
  countries = await request(searchValue, type);
  if (!countries.status && searchValue.length > 0) {
    const allLocalCountries = localData.getData() ? localData.getData() : [];
    const localStorageValues = allLocalCountries.map(({ name }) => name);
    const serverValues = countries.map(({ name }) => name);
    const viewedCountries = allLocalCountries.filter(({ name }) => serverValues.includes(name));
    const unviewedCountries = countries.filter(({ name }) => !localStorageValues.includes(name));

    countries = [...viewedCountries, ...unviewedCountries];
    if (type) {
      countries = [...allLocalCountries, ...unviewedCountries];
    }
  }
  numberItems = 10;
  infiniteScroll();
};

const loading = () => {
  if (search.value === '') {
    clearmatchList();
  } else {
    matchList.innerHTML = spinner();
    searchCountry(search.value);
  }
};

const searchRequest = debounce(loading, 500);

const checkHeightMatchListContent = (e) => {
  const scrollY = e.scrollHeight - e.scrollTop;
  const height = e.offsetHeight;

  if (!(height - scrollY) & height > 0) {
    numberItems += 5;
    infiniteScroll();
  }
};

/* Event listeners */
btnClearInput.addEventListener('click', clearInput);
app.addEventListener('click', clearInput);
matchList.addEventListener('scroll', (e) => checkHeightMatchListContent(e.target));
search.addEventListener('input', () => setTimeout(searchRequest, 500));
logo.addEventListener('click', localData.clearData);
search.addEventListener('click', (e) => {
  if (e.target.value === '') {
    searchCountry('EU', 'regionalbloc');
    e.stopPropagation();
  }
});
