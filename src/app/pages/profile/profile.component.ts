import { Component, OnInit } from '@angular/core';
import { ProfileObject } from '../../../constant';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [MatFormFieldModule,MatSelectModule,MatCardModule,MatInputModule,MatOptionModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  profileObject: any = ProfileObject;
  selectedIndex: number = 0;

  ngOnInit(): void {
    // Kezdeti index beállítása
    this.selectedIndex = 0;
  }

  reload(index: number): void {
    // Az index beállítása a kiválasztott option alapján
    this.selectedIndex = index;
  }

  firstName: string = 'John';
  lastName: string = 'Doe';

}
