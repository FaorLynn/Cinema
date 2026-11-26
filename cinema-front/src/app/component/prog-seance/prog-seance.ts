import { Component, OnInit, signal } from '@angular/core';
import { ProgSeance } from '../../model/prog';
import { SeanceService } from '../../service/seance-service';

@Component({
  selector: 'app-prog-seance',
  standalone: true,
  templateUrl: './prog-seance.html',
  styleUrl: './prog-seance.css'
})
export class ProgSeanceComponent implements OnInit {
  seances = signal<ProgSeance[]>([]);
  chargement = signal(true);
  erreur = signal<string | null>(null);

  constructor(private seanceService: SeanceService) {}

  ngOnInit(): void {
    this.seanceService.findProgrammation().subscribe({
      next: (data) => {
        this.seances.set(data);
        this.chargement.set(false);
      },
      error: (err) => {
        console.error('Erreur de chargement de la programmation', err);
        this.erreur.set(
          err.status === 403 ? "Ce compte n'est pas un responsable de cinéma."
          : err.status === 401 ? 'Veuillez vous connecter.'
          : 'Impossible de charger la programmation.'
        );
        this.chargement.set(false);
      }
    });
  }

  heureFormatee(heure: string): string {
    return heure ? heure.slice(0, 5) : '';
  }

  dateFormatee(date: string): string {
    if (!date) return '';
    const [annee, mois, jour] = date.split('-');
    return `${jour}/${mois}/${annee}`;
  }

  typeLibelle(type: string | null): string {
    if (!type) return '—';
    const t = type.replace(/_/g, ' ').toLowerCase();
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
}