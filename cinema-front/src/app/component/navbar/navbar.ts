import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  imports: [RouterLink,RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  protected authService = inject(AuthService);
protected router = inject(Router);

logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}
}
