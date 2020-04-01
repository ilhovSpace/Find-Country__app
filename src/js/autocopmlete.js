const autocomplete = (arrayCountries) => {
  if (arrayCountries && arrayCountries.length > 0) {
    const htmlViewedRusult = [];
    const htmlResult = [];
    arrayCountries.map((item) => {
      if (item.hasOwnProperty('viewed')) {
        return htmlViewedRusult.push(`
                <div class="card-autocomplete viewed">
                <i class="fa fa-history"></i><h4>${item.name}</h4><small>[${item.alpha3Code}]</small>
                </div>
                `);
      }
      return htmlResult.push(`
                <div class="card-autocomplete" id=${item.name}>
                     <i class="fa fa-search"></i><h4>${item.name}</h4><small>[${item.alpha3Code}]</small>
                </div>
                `);
    });
    const allResult = [...htmlViewedRusult, ...htmlResult].join('');
    return allResult;
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
