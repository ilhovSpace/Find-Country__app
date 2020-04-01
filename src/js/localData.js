const localData = {
  getdata: () => JSON.parse(localStorage.getItem('viewedCountries')),
  cleardata: () => localStorage.clear(),
  setdata: (viewedCounries) => {
    if (localStorage.getItem('viewedCountries') === null) {
      localStorage.setItem('viewedCountries', JSON.stringify([viewedCounries]));
    } else {
      const unviewedCountries = JSON.parse(localStorage.getItem('viewedCountries')).filter((item) => item.name !== viewedCounries.name);
      localStorage.setItem('viewedCountries', JSON.stringify([viewedCounries, ...unviewedCountries]));
    }
  },
};

export default localData;
