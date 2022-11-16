import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/user.model';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User>(undefined);
  private _baseUrl = `${environment.baseUrl}/auth`;
  private readonly loggedInUserKey = 'loggendInUser';

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem(this.loggedInUserKey);

    if (user) {
      this._currentUser.next(JSON.parse(user));
    }

    this.sessionInfo().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.handleLogout();
      }
    })
  }

  sessionInfo() {
    return this.http.get<{ isLoggedIn: boolean }>(`${this._baseUrl}/sessionInfo`).pipe(
      map(sessionInfo => sessionInfo.isLoggedIn)
    );
  }

  login(email: string,
    password: string) {
    return this.http.post<User>(`${this._baseUrl}/login`, { email, password }).pipe(
      tap(user => {
        this._currentUser.next(user);
        this.storeUserAfterLogin(user);
        this.router.navigateByUrl('/ideas');
      })
    );
  }

  logout() {
    return this.http.post(`${this._baseUrl}/logout`, null).pipe(
      tap(user => {
        this.handleLogout();
      })
    );
  }

  isLoggendIn() {
    return this._currentUser.getValue() !== undefined;
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

  private storeUserAfterLogin(user: User) {
    localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
  }

  private clearLocalStore() {
    localStorage.removeItem(this.loggedInUserKey);
  }

  private handleLogout() {
    this.clearLocalStore();
    this._currentUser.next(undefined);
    this.router.navigateByUrl('/login');
  }
}
