import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cinema } from '../../model/cinema';
import { CinemaService } from '../../service/cinema-service';

@Component({
  selector: 'app-tableau-cine',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tableau-cine.html',
  styleUrls: ['./tableau-cine.css']
})
export class TableauCineComponent implements OnInit {
  cinemas: Cinema[] = [];
  cinemaSelectionne: Cinema | null = null;

  constructor(private cinemaService: CinemaService) {}

  ngOnInit(): void {
    this.cinemaService.findAll().subscribe({
      next: (data) => {
  this.cinemas = data;
  this.cinemaSelectionne = data.length > 0 ? data[0] : null;
},
      error: (err) => console.error('Erreur de chargement', err)
    });
  }
}