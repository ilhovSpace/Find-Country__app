const autocomplete = (arrayCountries) => {
  if (arrayCountries && arrayCountries.length > 0) {
    const result = arrayCountries.map((item) => {
      return `<div class="card-autocomplete ${item.hasOwnProperty('viewed') ? 'viewed' : ''}">
                <i class="fa fa-history"></i><h4>${item.name}</h4><small>[${item.alpha3Code}]</small>
                </div>`;
    }).join('');
    return result;
  }
  if (arrayCountries && arrayCountries.message) {
    return `
            <div class="loading">
                <h4>${arrayCountries.message}</h4>
            </div>
        `;
  }
  return null;
};

export default autocomplete;
