import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../commun/passwordValidator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

formValidator = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(20)]


form :FormGroup = new FormGroup({
  firstName: new FormControl('', [...this.formValidator, Validators.pattern('[a-zA-Z ]*')]),
  lastName: new FormControl('',[...this.formValidator, Validators.pattern('[a-zA-Z ]*')]),
  email: new FormControl('',[...this.formValidator, Validators.email]),
  password: new FormControl('',[...this.formValidator]),
  password_confirmation: new FormControl('',[...this.formValidator]),
  marketingAccept: new FormControl(false),
},passwordValidator('password','password_confirmation'))

constructor(private authService: AuthService) { }

onSubmit(){
  if(this.form.invalid){
    return;
  }
    this.authService.signUp(this.form.value).subscribe({
      next: (data) => {
        console.log(data);
        alert("Sign up success");
      },
      error: (error) => {
        this.form.setErrors({invalid: true});
      }
    })
}


}
