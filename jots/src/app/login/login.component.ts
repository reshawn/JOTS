import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { NewCaseComponent } from '../new-case/new-case.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  profilepic: string;
  object: Object = null;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.user.subscribe((user: any) => {
      console.log(user);
      this.profilepic = user.photoURL;
      console.log('background-image: url( ' + user.photoURL + ')');
      this.object = {
        'background-image': 'url(' + this.profilepic + ')'
      }
    });
  }

  ngOnInit() {
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  googleSignUp() {
    this.authService.loginWithGoogle();
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  createNewCase() {
    this.router.navigate(['/new-case']);
  }

}