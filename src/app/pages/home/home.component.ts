import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoggedIn = false;
  constructor(private routernote:Router,private routerProfile:Router){}

changePage(){
  this.routernote.navigateByUrl("/notesite");
}

ngOnInit(): void {
  //this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
}
}
