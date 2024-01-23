import { Component } from '@angular/core';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { WeatherData } from './weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [WeatherDisplayComponent, CitySearchComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  selectedCityWeather!: WeatherData;
  onSelectedCity(selectedCity: WeatherData): void {
    this.selectedCityWeather = selectedCity;
  }
}
