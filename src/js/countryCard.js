import request from './request';
import localData from './localData';

const countryCardBlock = document.getElementById('country-card');

const countryCardTepmlate = (country) => {
  countryCardBlock.innerHTML = `
    <h4>${country.name}</h4>
    <div class="row">
        <div class="short-info col-md-5 col-xs-12 order-md-2"">
            <img src="${country.flag}" alt="country-flag" />
            <h5>${country.cioc}</h5>
        </div>
        <div class="full-info col-md-7 col-xs-12 corder-md-1">
            <ul>
                <li>Name: <span>${country.name}</span></li>
                <li>Alpha Code: <span>${country.alpha3Code}</span></li>
                <li>Numeric Code: <span>${country.numericCode}</span></li>
                <li>Cioc Code: <span>${country.cioc}</span></li>
                <li>Native name: <span>${country.nativeName}</span></li>
                <li>Capital: <span>${country.capital}</span></li>
                <li>Region: <span>${country.region}</span></li>
                <li>Subregion: <span>${country.subregion}</span></li>
                <li>Population: <span>${country.population}</span> people</li>
                <li>Area: <span>${country.area}</span> km2</li>
            </ul>
        </div>
    </div>
    `;
};

const countryCard = async (country) => {
  const allCountryInfo = await request(country);
  const viewedCountry = await allCountryInfo;
  viewedCountry[0].viewed = true;
  localData.setdata(...viewedCountry);
  return countryCardTepmlate(...allCountryInfo);
};

export default countryCard;
