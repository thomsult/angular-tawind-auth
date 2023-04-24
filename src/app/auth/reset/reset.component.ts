import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {
    [key: string]: { value: string };
  } | null => {
    if (!control.value?.password || !control.value?.confirmPassword)
      return { empty: { value: control.value } };
    const forbidden =
      control.value?.password !== control.value?.confirmPassword;
    return forbidden ? { 'password no match': { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  email: string = '';
  emailVerified: boolean = false;
  form: FormGroup = new FormGroup({
    '0': new FormControl(''),
    '1': new FormControl(''),
    '2': new FormControl(''),
    '3': new FormControl(''),
    '4': new FormControl(''),
    '5': new FormControl(''),
  });
  finalValidator = [Validators.required, Validators.minLength(6)];
  finalForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', this.finalValidator), // this should be hidden
      password: new FormControl('', this.finalValidator),
      confirmPassword: new FormControl('', this.finalValidator),
    },
    { validators: passwordValidator() }
  );

  constructor(private authService: AuthService, private router: Router) {
    if (router.getCurrentNavigation()?.extractedUrl.queryParams?.['input']) {
      const CurrentCode =
        router.getCurrentNavigation()?.extractedUrl.queryParams?.['input'];
      const [email, code] = window.atob(CurrentCode).split(';');
      code.split('').forEach((value: string, index: number) => {
        this.form.controls[index].setValue(value);
      });
      this.email = email;
    }
  }

  onSubmitCode() {
    console.log(this.form.valid, this.email);
    if (this.form.valid && this.email) {
      const code = Object.values(this.form.value).join('');
      console.log(code, this.email);
      if (this.authService.forgetPassword(this.email, code)) {
        this.emailVerified = true;
        this.finalForm.controls['email'].setValue(this.email);
      }
    }
  }
  onFinalSubmit() {
    if (this.finalForm.valid) {
      this.authService.resetPassword(this.finalForm.value);
    }
  }
  resend() {
    this.email&&this.authService.sendEmail(this.email);
    console.log('email sent');
  }
  ngOnInit(): void {
    if (!this.authService.email && this.email === '') {
      this.router.navigate(['/forget']);
    }
    if (this.authService.email && this.email === '') {
      this.email = this.authService.email;
    }
  }
}
