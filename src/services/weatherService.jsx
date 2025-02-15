const API_KEY = 'a5913e247d4c4ed5bd721932251402';
const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;

const show = async (city) => {
  try {
    const queryString = `&q=${city}`;
    const res = await fetch(BASE_URL + queryString);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    console.log('Data:', data);
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

const showMultiple = async (cities) => {
  try {
    const promises = cities.map(city => show(city));
    const results = await Promise.all(promises);
    return results;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

export { show, showMultiple };
