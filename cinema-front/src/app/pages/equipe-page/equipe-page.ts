import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink,RouterLinkActive],
  selector: 'app-equipe-page',
  styleUrl: './equipe-page.css',
  templateUrl: './equipe-page.html',
})
export class EquipePage {
  protected authService = inject(AuthService);}
