import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from './commun/localStorageUtils';


export const AuthGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const localStorageService = inject(StorageService)
  const localStorage = localStorageService.getStorage();
  if (!localStorage.find((e) => e['access_token'])) {
     router.navigate(['auth/login']);
     return false;
   }
  const times = localStorage.find((e) => e['expires_at'])?.["expires_at"];
   const expire = parseFloat(times);
   if(new Date(expire) < new Date()){
     router.navigate(['auth/login']);
     localStorageService.clearAll();
     return false;
   }
   localStorageService.changes.subscribe((data) => {
     console.log(data);
   });

  return true;
};
