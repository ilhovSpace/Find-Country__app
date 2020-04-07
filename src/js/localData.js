const localData = {
  getData: () => JSON.parse(localStorage.getItem('viewedCountries')),
  clearData: () => localStorage.clear(),
  setData: (viewedCounries) => {
    if (!localStorage.getItem('viewedCountries')) {
      localStorage.setItem('viewedCountries', JSON.stringify([viewedCounries]));
    } else {
      const unviewedCountries = JSON.parse(localStorage.getItem('viewedCountries')).filter(({ name }) => name !== viewedCounries.name);

      localStorage.setItem('viewedCountries', JSON.stringify([viewedCounries, ...unviewedCountries]));
    }
  },
};

export default localData;
