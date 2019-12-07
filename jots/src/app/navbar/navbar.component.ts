import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: any;

  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.getLoginState();
  }

  ngOnInit() {
  }

}
