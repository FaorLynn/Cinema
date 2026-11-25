import { Component, inject, input, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../service/auth-service';
import { AchatService } from '../../service/achat-service';
import { ReservationModel } from '../../model/reservationModel';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  
  imports: [AsyncPipe,CommonModule],
  selector: 'app-reservation',
  styleUrl: './reservation.css',
  templateUrl: './reservation.html',
})
export class Reservation {
  reservation = input.required<ReservationModel>();
  

}
    

    
  
  


    

