import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jots';
  // constructor(authService: AuthService, router: Router) {
  //   console.log(authService.user);
  //   if (!authService.loggedIn) {
  //     router.navigate(['login']);
  //   }
  //   else {
  //     router.navigate(['profile']);
  //   }
  // }
}
