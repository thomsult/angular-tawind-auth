import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetComponent } from './forget/forget.component';
import { AuthRouting } from './auth-routing.module';
import { ResetComponent } from './reset/reset.component';
import { PasswordInputComponent } from './commun/password-input/password-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocialComponent } from './commun/social/social.component';
import { StorageService } from './commun/localStorageUtils';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgetComponent,
    ResetComponent,
    PasswordInputComponent,
    SocialComponent,
  ],
  providers: [StorageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRouting,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
