import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  // form: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });
  // @Input() error: string | null;
  // @Output() submitEM = new EventEmitter();
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  // submit() {
  //   if (this.form.valid) {
  //     this.submitEM.emit(this.form.value);
  //   }


  // }

}