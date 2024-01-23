import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  http = inject(HttpClient);

  /**
   * Gets the weather data of the selected data
   * @param lat { number } - Latitud of the selected city
   * @param lon { number } - Longitude of the selected city
   * @returns The weather data of the selected city
   */
  getWeatherData(lat: number, lon: number) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherAPI}`)
  }

  /**
   * Get the lat and long of the selected city
   * @param city { string } - The city we want to get lat and long from
   * @returns The lat and long of the selected city
   */
  getLatAndLong(city: string) {
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${environment.weatherAPI}`);
  }
}
