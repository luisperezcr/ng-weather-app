import { Component } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';

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
export class WeatherDisplayComponent {
  image = '../../../assets/cold.jpg';
}
