import axios from "axios"
const baseUrl="http://localhost:4000/weather";

 export const getHistoryWeather=(city)=>{
    return axios.get(`${baseUrl}?city=${city}`,
    );
 }