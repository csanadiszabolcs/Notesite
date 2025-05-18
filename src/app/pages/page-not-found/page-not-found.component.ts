import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-page-not-found',
  imports: [MatCardContent,MatCardTitle,MatCardActions,MatCard],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
