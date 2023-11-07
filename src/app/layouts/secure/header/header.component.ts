import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatButtonModule,],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
// console.log(this.WebStorageService.getLocalStorageData())
  }

}
