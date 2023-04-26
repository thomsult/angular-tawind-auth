import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetComponent } from './forget/forget.component';
import { ResetComponent } from './reset/reset.component';
import { SocialComponent } from './commun/social/social.component';
const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'signup',
    component:SignupComponent,
  },
  {
    path: 'forget',
    component:ForgetComponent,
  },
  {
    path: 'reset',
    component:ResetComponent,
  },
  {
    path: 'google',
    component:SocialComponent,
    children: [
      {
        path: 'redirect',
        component:SocialComponent,
      }
    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRouting {}