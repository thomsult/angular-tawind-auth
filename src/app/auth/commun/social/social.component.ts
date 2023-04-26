import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {
  constructor(private authService: AuthService, private router:Router) {

  }

  ngOnInit(): void {
    const url = window.location.href;
    
    if(url.includes('redirect')){
      const newUrl = url.replace('http://localhost:4200', 'http://localhost:3000');
      this.authService.loginWithGoogle(newUrl).subscribe((res)=>{
        this.router.navigate(['/dashboard']);
      });
    }else{
      this.authService.loginWithGoogle();

    }
  }
    
}
