import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { ValidatorFn } from '@angular/forms';
import { passwordValidator } from '../commun/passwordValidator';



@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  email: string = '';
  code: string = '';
  emailVerified: boolean = false;
  finalValidator = [Validators.required, Validators.minLength(6)];
  finalForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', this.finalValidator), // this should be hidden
      password: new FormControl('', this.finalValidator),
      confirmPassword: new FormControl('', this.finalValidator),
    },
    { validators: passwordValidator('password','confirmPassword') }
  );

  constructor(private authService: AuthService, private router: ActivatedRoute) {
    router.queryParams.subscribe((params) => {
      const CurrentCode = params['input'];
      this.email = params['email'];
      if(!CurrentCode) return;
      const [email, code] = window.atob(CurrentCode).split(';');
      if (email && code) {
        this.email = email;
        this.code = code; 
      }
    });
  }

  onFinalSubmit() {
    if (this.finalForm.valid) {
      this.authService.resetPassword({
        ...this.finalForm.value,
        decryptedCode: this.code,
      }).subscribe({
        next: (res) => {
          if (res) {
            console.log(res);

          }
        }
      })
    }
  }
  resend() {
    this.email&&this.authService.sendResetPassword(this.email).subscribe({
      next: (e) => {
        console.log('email sent',this.email);
      },
      error: (err) => {
        console.log(err);
      },
    })
    
  }
  ngOnInit(): void {
    if(this.code){
      this.emailVerified = true;
      this.finalForm.controls['email'].setValue(this.email);
    }

  }
}

