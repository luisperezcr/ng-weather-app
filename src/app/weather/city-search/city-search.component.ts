import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, lastValueFrom } from 'rxjs';
import { WeatherService } from '../weather.service';
import { CityResult, WeatherData } from '../weather.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss'
})
export class CitySearchComponent implements OnInit {
  citySearch: FormControl = new FormControl('');
  cityOptions: CityResult[] = [];
  isLoading = false;
  @Output() selectedCity = new EventEmitter<WeatherData>();

  constructor(readonly weatherService: WeatherService) {}

  ngOnInit() {
    this.citySearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (value) {
          void this.getCityWeatherInfo(value);
        } else {
          this.isLoading = false;
        }
      });
  }

  async getCityWeatherInfo(city: string) {
    const result$ = this.weatherService.getLatAndLon(city);
    this.cityOptions = await lastValueFrom(result$) as CityResult[];
  }

  async onSelectedCity(selectedCity: CityResult) {
    this.isLoading = true;
    const result$ = this.weatherService.getWeatherData(selectedCity.lat, selectedCity.lon);
    const cityWeatherData = await lastValueFrom(result$);
    const cleanedWeatherData: WeatherData = {
      feelsLike: cityWeatherData.main.feels_like,
      humidity: cityWeatherData.main.humidity,
      temperature: cityWeatherData.main.temp,
      maxTemperature: cityWeatherData.main.temp_max,
      minTemperature: cityWeatherData.main.temp_min,
      wind: cityWeatherData.wind.speed,
      name: cityWeatherData.name,
      country: cityWeatherData.sys.country
    }
    this.selectedCity.emit(cleanedWeatherData);
    this.isLoading = false;
  }
}
