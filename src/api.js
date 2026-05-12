const API_Key = 'WK7S2E84CXRU85556H37HSYYU';

export default async function getData() {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=${API_Key}`);
        const data = await response.json();
        return new Weather(data);
    } catch (error) {
        throw error;
    }
}

class Weather {
    constructor(data) {
        this.address = data.address;
        this.currentConditions = data.currentConditions;
    }
}



