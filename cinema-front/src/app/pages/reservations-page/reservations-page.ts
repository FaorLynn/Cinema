import { Component, inject, signal } from '@angular/core';
import { Reservation } from '../../component/reservation/reservation';
import { Title } from '@angular/platform-browser';
import { ReservationModel } from '../../model/reservationModel';
import { AchatService } from '../../service/achat-service';
import { AuthService } from '../../service/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [Reservation,CommonModule],
  selector: 'app-reservations-page',
  styleUrl: './reservations-page.css',
 
  templateUrl: './reservations-page.html',
})
export class ReservationsPage {

  protected title: Title = inject(Title);
  protected authService: AuthService = inject(AuthService);
  protected achatService:AchatService= inject(AchatService);
  protected reservations = signal<ReservationModel[]>([]);


  ngOnInit(): void {
    console.log(this.authService.compteId)
    this.title.setTitle("Mes réservations");
    this.achatService.getReservations(this.authService.compteId).subscribe({
    next: (data) => {
      this.reservations.set(data)

      console.log(data)
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}
