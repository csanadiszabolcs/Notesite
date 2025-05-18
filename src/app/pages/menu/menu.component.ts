import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink,RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterLinkActive,CommonModule,MatToolbarModule,MatButtonModule,MatSidenavModule,MatIcon,MatListModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() sidenav!: MatSidenav;
  @Output() menu:EventEmitter<string> = new EventEmitter();
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(private authService: AuthService) {
    console.log("constructor called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authService.signOut().then(() => {
      this.logoutEvent.emit();
      this.closeMenu();
    });
  }
}
