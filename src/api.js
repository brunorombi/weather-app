const API_Key = "WK7S2E84CXRU85556H37HSYYU";

export async function getData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_Key}`
    );

    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export class Weather {
  constructor(data) {
    this.city = data.address;
    this.temp = data.currentConditions.temp;
    this.time = data.currentConditions.datetime;
    this.icon = data.currentConditions.icon;
    this.description = data.description;
    this.date = data.days[0].datetime;
  }
}
