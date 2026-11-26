import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProgSeanceComponent } from '../../component/prog-seance/prog-seance'

@Component({
  imports: [RouterLink,RouterLinkActive, ProgSeanceComponent],
  selector: 'app-equipe-page',
  styleUrl: './equipe-page.css',
  templateUrl: './equipe-page.html',
})
export class EquipePage {
  protected authService = inject(AuthService);}
