import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email?: string;
  constructor() { }
  async forgetPassword(email: string, code: string):Promise<Boolean> {
    console.log(email, code);
    return true;
  }
  async sendEmail(email: string):Promise<Boolean> {
    this.email = email;
    return true;
  }
  async resetPassword(data: any):Promise<Boolean> {
    console.log(data);
    return true;
  }
  //
  async login(data: any):Promise<Boolean> {
    console.log(data);
    return true;
  }
  async logout():Promise<Boolean> {
    return true;
  }
  //
  async signUp(data: any):Promise<Boolean> {
    console.log(data);
    return true;
  }
}
