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

  errorMessage.classList.remove("active");
  errorMessage.textContent = "";
  const searchValue = input.value.trim();

  if (input.validity.valueMissing) {
    displayError("You must enter a city name");
    return;
  }
  
  if (!/[a-zA-Z]/.test(searchValue)) {
    displayError("Your search should contain only letters");
    return;
  }

  const weather = await getWeather(searchValue);

  if(weather) {
    displayWeather(weather);
  } else {
    displayError(`Was not possible to find ${searchValue}`)
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

function displayError(error) {
  errorMessage.textContent = "";
  errorMessage.classList.add("active")
  errorMessage.textContent = error;
}

function displayWeather(weather) {
  document.querySelector(".city").textContent = weather.city;
  document.querySelector(".temp").textContent = weather.temp;
  document.querySelector(".description").textContent = weather.description;
  document.querySelector(".time").textContent = weather.time;
  document.querySelector(".date").textContent = weather.date;
}
