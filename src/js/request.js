const request = async (requestValue, type = 'name') => {
  try {
    const result = await fetch(`https://restcountries.eu/rest/v2/${type}/${requestValue}`);

    return await result.json();
  } catch (error) {
    return error;
  }
};

export default request;
