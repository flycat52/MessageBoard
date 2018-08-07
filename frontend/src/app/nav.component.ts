import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav',
  template: ` <mat-toolbar color="primary">
                <button mat-button routerLink="/">Message board</button>
                <button mat-button routerLink="/messages">Messgaes</button>
                <span style="flex: 1 1 auto"></span>
                <button mat-button routerLink="/register" *ngIf="!auth.isAuthenticated">Register</button>
                <button mat-button routerLink="/login" *ngIf="!auth.isAuthenticated">Login</button>
                <button mat-button routerLink="/user" *ngIf="auth.isAuthenticated">Welcome {{auth.name}}</button>
                <button mat-button (click)="auth.logout()" *ngIf="auth.isAuthenticated">Logout</button>
              </mat-toolbar>
  `
})
export class NavComponent {
  constructor(private auth: AuthService) {}
}
