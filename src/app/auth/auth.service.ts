import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { UserAuth, resLogin } from './commun/definition.type';
import { Router } from '@angular/router';
import {StorageService} from './commun/localStorageUtils';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email?: string;
  public data;
  constructor(
    private localStorage: StorageService,
    private http: HttpClient) {

      this.data = localStorage.getStorage();
    }
  sendResetPassword(email: string) {
    return this.http.post<any | Error>(
      `${environment.BACK_END_URL}/auth/resetPassword`,
      { email }
    );
  }
  resetPassword(data: {
    email: string;
    password: string;
    confirmPassword: string;
    decryptedCode: string;
  }) {
    return this.http.post<any | Error>(
      `${environment.BACK_END_URL}/auth/resetPassword`,
      data
    );
  }
  //
  login(data: UserAuth): Observable<resLogin> {
    return this.http
      .post<resLogin>(`${environment.BACK_END_URL}/auth/login`, data)
      .pipe((res) => {
        res.subscribe((data) => {
          this.saveUserToken(data);
        });
        return res;
      });
  }
  async logout(): Promise<Boolean> {
    this.localStorage.clearAll();
    return true;
  }
  //
  signUp(data: any): Observable<any | Error> {
    return this.http.post<any>(`${environment.BACK_END_URL}/auth/signup`, data);
  }

  loginWithGoogle(newUrl?: string): Observable<any | Error> {
    if (newUrl) {
      return this.http.get<any>(newUrl).pipe((res) => {
        res.subscribe((data) => {
          this.saveUserToken(data);
        });
        return res;
      });
    }
    window.location.href = `${environment.BACK_END_URL}/auth/google`;
    return new Observable();
  }

  saveUserToken(data: resLogin) {
    this.localStorage.clearAll();
    Object.entries(data).forEach(([key, value]) => {
      this.localStorage.store(key, value);
    });
  }
}
