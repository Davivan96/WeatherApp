const apiString = 'OOFDRfcI7Y4HWw0VYRz0xQFqfOwQpzdV';


const getWeather = async (id) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${apiString}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

//Se solicita la ciudad a buscar
const getCity = async (city) => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${apiString}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};


// getCity("Mexico")
//   .then(data => {
//     return (getCondition(data.Key));
//   })
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

