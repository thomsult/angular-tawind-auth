import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../commun/passwordValidator';

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
  first_name: new FormControl('', [...this.formValidator, Validators.pattern('[a-zA-Z ]*')]),
  last_name: new FormControl('',[...this.formValidator, Validators.pattern('[a-zA-Z ]*')]),
  email: new FormControl('',[...this.formValidator, Validators.email]),
  password: new FormControl('',[...this.formValidator]),
  password_confirmation: new FormControl('',[...this.formValidator]),
  marketing_accept: new FormControl(false),
},passwordValidator('password','password_confirmation'))



onSubmit(){
  if(this.form.invalid){
    return;
  }
    console.log(this.form.value);
}


}
