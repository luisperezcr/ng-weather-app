import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { WeatherData } from '../weather.service';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DecimalPipe
  ],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss'
})
export class WeatherDisplayComponent implements OnChanges {
  image!: string;

  @Input() weatherData!: WeatherData;

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['weatherData'].currentValue) {
      this.image = (this.weatherData && this.weatherData.temperature < 18) ? 'cold.jpg' : 'hot.jpg';
    }
  }
}
