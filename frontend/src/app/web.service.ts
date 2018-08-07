import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class WebService {
  BASE_URL = 'http://localhost:1234/api';

  private messageStore = [];

  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();

  constructor(
    private http: Http,
    private snackbar: MatSnackBar,
    private auth: AuthService
  ) {
    // this.getMessages();
  }

  getMessages(user) {
    user = user ? '/' + user : '';
    this.http.get(this.BASE_URL + '/messages' + user).subscribe(
      response => {
        this.messageStore = response.json();
        this.messageSubject.next(this.messageStore);
      },
      error => {
        this.handleError('unable to get message');
      }
    );
  }

  async postMessage(message) {
    try {
      const response = await this.http
        .post(this.BASE_URL + '/messages', message)
        .toPromise();
      this.messageStore.push(response.json());
      this.messageSubject.next(this.messageStore);
    } catch (error) {
      this.handleError('unable to post message');
    }
  }

  getUser() {
    return this.http
      .get(this.BASE_URL + '/users/me', this.auth.tokenHeader)
      .pipe(map(res => res.json()));
  }

  saveUser(userData) {
    return this.http
      .post(this.BASE_URL + '/users/me', userData, this.auth.tokenHeader)
      .pipe(map(res => res.json()));
  }

  private handleError(error) {
    this.snackbar.open(error, 'close', { duration: 2000 });
  }
}
