import { Component } from '@angular/core';
import { TableauCineComponent } from '../../component/tableau-cine/tableau-cine';
import { TableauFilmComponent } from '../../component/tableau-film/tableau-film';

@Component({
  imports: [TableauCineComponent,TableauFilmComponent],
  selector: 'app-films-page',
  styleUrl: './films-page.css',
  templateUrl: './films-page.html',
})
export class FilmsPage {}
