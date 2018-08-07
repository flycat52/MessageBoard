import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  template: `
    <mat-card>
      <mat-form-field>
      <input type="email" [(ngModel)]="loginData.email" matInput placeholder="Email">
      </mat-form-field>
      <mat-form-field>
        <input  type="password" [(ngModel)]="loginData.password" matInput placeholder="Password" >
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="login()">Login</button>
    </mat-card>
  `
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.loginData);
  }
}
