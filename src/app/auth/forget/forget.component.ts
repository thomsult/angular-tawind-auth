import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {
  email: string = "";
  constructor(private authService : AuthService,private router: Router ) { }
  // formControl: FormGroup = new FormGroup({
  //   Email:new FormControl("")
  // });
  @ViewChild('formRef') formRef!: NgForm;
  @ViewChild('emailRef') emailRef!: FormControl;
  onSubmit() {
    if (this.formRef.invalid) {
      this.formRef.form.markAllAsTouched();
    } else {
      const reset = this.authService.sendEmail(this.emailRef.value);
      if (reset) {
        this.formRef.reset();
        this.router.navigate(['../reset']);
      }

    }
  }

}
