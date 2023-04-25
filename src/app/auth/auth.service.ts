import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email?: string;
  constructor() { }
  forgetPassword(email: string, code: string) {
    console.log(email, code);
    return true;
  }
  async sendEmail(email: string):Promise<Boolean> {
    this.email = email;
    return true;
  }
  resetPassword(data: any) {
    console.log(data);
    return true;
  }
  //
  login(data: any) {
    console.log(data);
    return true;
  }
  logout() {
    return true;
  }
  //
  signUp(data: any) {
    console.log(data);
    return true;
  }
}
