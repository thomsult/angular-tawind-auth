import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    auto_login: new FormControl(false),
  });
  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (data) => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.form.setErrors({ invalid: true });

          console.log(error);
        },
      });
    }
  }
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  ngOnInit() {

    if(this.authService.data.find((e) => e['auto_login'])){
      this.router.navigate(['/dashboard']);
    }
  }
}
