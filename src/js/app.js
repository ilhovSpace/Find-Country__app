import countryCard from './countryCard';
import request from './request';
import debounce from './debounce';
import spinner from './spinner';
import autocopmlete from './autocopmlete';
import localData from './localData';

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const btnClearInput = document.getElementById('clear-input');
const logo = document.getElementById('logo');
const app = document.getElementById('app');

let countries = [];
let lastChangeCountry = 'Enter country...';
let heightMatchListContent = 0;
let numberItems = 0;


const clearmatchList = () => {
  matchList.innerHTML = '';
};
const clearInput = () => {
  search.value = '';
  search.placeholder = lastChangeCountry;
  clearmatchList();
};


const defaulValues = () => {
  heightMatchListContent = 230; // depend on hight item block
  numberItems = 10;
};

const changeInput = (value) => {
  const countryName = value.replace(/\[.*?\]/, '');
  lastChangeCountry = countryName;
  clearInput();
  search.placeholder = countryName;
  countryCard(countryName);
};

const infiniteScroll = () => {
  if (!countries.status) {
    const countriesPart = countries.slice(0, numberItems);
    matchList.innerHTML = autocopmlete(countriesPart);
  } else {
    matchList.innerHTML = autocopmlete(countries);
  }
};

const searchCountry = async (searchValue, type) => {
  countries = await request(searchValue, type);
  if (!countries.status && searchValue.length > 0) {
    const local = localData.getdata() ? localData.getdata() : [];
    const localStorageValues = local.map((el) => el.name);
    await countries.map((el) => !localStorageValues.includes(el.name) ? el : el['viewed'] = true);
    if (type) {
      const otherCountries = countries.filter((el) => !(localStorageValues.includes(el.name)));
      countries = [...local, ...otherCountries];
    }
  }
  defaulValues();
  infiniteScroll();
};

const showLocalData = () => {
  searchCountry('EU', 'regionalbloc');
};

const loading = () => {
  if (search.value === '') {
    clearmatchList();
  } else {
    matchList.innerHTML = spinner();
    searchCountry(search.value);
  }
};

const itemValue = (e) => {
  if (e.target.tagName === 'SMALL') {
    changeInput(e.target.previousSibling.innerText);
  } else if (e.target.tagName === 'I') {
    changeInput(e.target.nextSibling.innerText);
  } else {
    changeInput(e.target.innerText);
  }
};

const searchRequest = debounce(loading, 500);

const checkHeightMatchListContent = (e) => {
  if (e.currentTarget.scrollTop >= heightMatchListContent) {
    numberItems += 5;
    heightMatchListContent += 230;
    infiniteScroll();
  }
};

/* Event listeners */
btnClearInput.addEventListener('click', () => clearInput());
app.addEventListener('click', clearInput);
matchList.addEventListener('scroll', e => checkHeightMatchListContent(e));
search.addEventListener('input', () => setTimeout(searchRequest, 500));
logo.addEventListener('click', () => localData.cleardata());
search.addEventListener('click', (e) => {
  if (e.target.value === '') {
    showLocalData();
    e.stopPropagation();
  }
});
matchList.addEventListener('click', (e) => {
  itemValue(e);
  e.stopPropagation();
});
