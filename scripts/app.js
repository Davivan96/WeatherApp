const cityForm = document.querySelector('form');
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const input = document.querySelector(".form-control");
const body = document.querySelector("body");
const h1 = document.querySelector('.heading-color');
const label = document.querySelector('.label-text');




//Funcion para modificar nuestro form
const updateUI = (data) => {
  const cityDets = data.cityGet;
  const cityWeather = data.weather;
  console.log(cityDets);
  console.log(cityWeather);
  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-2">${cityWeather.WeatherText}</div>
  <div class="display-4 my-2">
    <span>${cityWeather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  //Funcionalidad de agregar imagenes
  let srcIcons = `./icons/${cityWeather.WeatherIcon}.svg`;
  icon.setAttribute('src', srcIcons);

  let srcImagenes = cityWeather.IsDayTime ? './img/day.svg' : './img/night.svg';
  time.setAttribute('src', srcImagenes);

  //Funcionalidad para agregar background y estilos de texto
  let imagenDiaImportada = body.style.backgroundImage = "url('/img/dayback.png')";
  let imagenNocheImportada = body.style.backgroundImage = "url('/img/night.jpg')";
  let bodyBackground = cityWeather.IsDayTime ? imagenDiaImportada : imagenNocheImportada;
  body.style.setProperty("background-image", bodyBackground);


  //Cambiar color de H1 e Label dependiendo del horario
  let textoNoche = h1.style.color = "#FFFFFF";
  let textoDia = h1.style.color = "#000000";
  let labelTextNight = label.style.color = "#c1bed1";
  let labelTextDay = label.style.color = "000000";
  let headingFont = cityWeather.IsDayTime ? (textoDia, labelTextDay) : (textoNoche, labelTextNight);
  h1.style.setProperty("color", headingFont);

  //Se remueve el d-none si está presente
  card.classList.contains('d-none') ? card.classList.remove('d-none') : "No tiene esa clase";
};



const updateCity = async (city) => {
  //Se llama a la funcion getCity()
  const cityDetails = await getCity(city);
  const weatherResponse = await getWeather(cityDetails.Key);

  return {
    cityGet: cityDetails,
    weather: weatherResponse
  };
};


cityForm.addEventListener("submit", (e) => {
  //Previene que la pagina se actualice al hacer el submit
  e.preventDefault();

  //Se accede al valor que se escribe en el input
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //Se regresa la data de nuestra promesa y se imprime en el html invocando la funcion updateUI()
  updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));


  //Set local storage

  localStorage.setItem("city", city);



});;


if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(error => console.log(error));

}