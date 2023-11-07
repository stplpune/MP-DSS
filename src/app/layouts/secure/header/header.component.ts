import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';
import { MatDialog} from '@angular/material/dialog';

;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatButtonModule],
  templateUrl: './header.component.html',
  providers:[MatDialog],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( 
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
// console.log(this.WebStorageService.getLocalStorageData())
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '50%',
      data: '',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'Yes') {
        // this.clearLocalStorage();
      }
    });
  }

}
