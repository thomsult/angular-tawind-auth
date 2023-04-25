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
  email: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.authService.sendEmail(this.form.value.email).then((res) => {
      if (res) {
        this.form.reset();
        this.router.navigate(['../reset',], { queryParams: { email: this.form.value.email } });
      }
    });
  }
}
