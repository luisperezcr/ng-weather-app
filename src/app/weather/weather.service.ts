import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

export interface WeatherData {
  feelsLike: number;
  humidity: number;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  wind: number;
  name: string;
  country: string;
}

export interface CityResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

interface CityCompleteWeatherData {
  main: {
    feels_like: number;
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
  },
  name: string;
  sys: {
    country: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(readonly http: HttpClient) {}

  /**
   * Gets the weather data of the selected data
   * @param lat { number } - Latitud of the selected city
   * @param lon { number } - Longitude of the selected city
   * @returns The weather data of the selected city
   */
  getWeatherData(lat: number, lon: number): Observable<CityCompleteWeatherData> {
    return this.http.get<CityCompleteWeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherAPI}&units=metric`)
  }

  /**
   * Get the lat and long of the selected city
   * @param city { string } - The city we want to get lat and long from
   * @returns The lat and long of the selected city
   */
  getLatAndLon(city: string) {
    return this.http.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${environment.weatherAPI}`);
  }
}
