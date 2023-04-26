import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data!: string;
  constructor(private service: HomeService) { }


  ngOnInit() {
    this.service.get().subscribe(data => {
      this.data = data.message;
    });
  }
}
