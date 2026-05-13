import "./styles.css";
import { getData, Weather } from "./api";
console.log("Hello!");

async function main() {
  const weather = await getData("saopaulo");
  console.log(weather);
}

// main()
const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMessage = document.querySelector(".error");
const content = document.querySelector("#content");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMessage.textContent = "";
  const searchValue = input.value.trim();

  if (input.validity.valueMissing) {
    errorMessage.textContent = "You must enter a city name";
    return;
  }

  if (!/[a-zA-Z]/.test(searchValue)) {
    errorMessage.textContent = "Your search should contain only letters";
    return;
  }

  const weather = await getWeather(searchValue);
  if(weather) {
    displayWeather(weather);
  }
});

async function getWeather(value) {
  try {
    const data = await getData(value);
    const weather = new Weather(data);
    return weather;
  } catch (error) {
    console.error(error);
    displayError();
  }
}

function displayError() {
  errorMessage.textContent = "Was not possible to find this city";
}

function displayWeather(weather) {
  document.querySelector(".city").textContent = weather.city;
  document.querySelector(".temp").textContent = weather.temp;
  document.querySelector(".description").textContent = weather.description;
  document.querySelector(".time").textContent = weather.time;
  document.querySelector(".date").textContent = weather.date;
}
