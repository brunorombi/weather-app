import "./styles.css";
import getData from "./api";
console.log("Hello!");

async function main() {
    const weather = await getData();
    console.log(weather);
}

main()