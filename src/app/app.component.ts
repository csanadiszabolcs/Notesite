import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NotesiteComponent } from './pages/notesite/notesite.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

// stb.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MenuComponent,
  MatSidenav,
MatNativeDateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Jegyzet';
  isLoggedIn = false;
 /* changemenu(actualpage:string){
    this.page = actualpage;
  }*/
constructor(private authService: AuthService) {}
    private authSubscription?: Subscription;
  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      //localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
  }
    checkLoginStatus(): void {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  
  logout(): void {
    this.authService.signOut();
  }
  
    onToggleSidenav(sidenav: MatSidenav){
      sidenav.toggle();
    }
  }
