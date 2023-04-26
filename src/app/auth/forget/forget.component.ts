import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent {
  constructor(private authService: AuthService, private router: Router) {}
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.authService.sendResetPassword(this.form.value.email).subscribe({
      next: (e) => {
        const email = this.form.value.email;
         this.form.reset();
         this.router.navigate(['../auth/reset'], { queryParams: { email: email } });
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
