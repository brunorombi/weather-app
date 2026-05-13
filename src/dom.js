const form = document.querySelector("form");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const weatherContent = document.querySelector("#content");

form.addEventListener("submit", () => {
    if(form.validity.valueMissing) {
        console.log("teste")
    }
})

