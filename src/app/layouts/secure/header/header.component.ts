import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';
import { MatDialog} from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/shared/components/global-dialog/global-dialog.component';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';

;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatButtonModule],
  templateUrl: './header.component.html',
  providers:[MatDialog,CommonMethodsService],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( 
    private dialog: MatDialog,
    private commonMethods:CommonMethodsService
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
        this.clearLocalStorage();
      }
    });
  }

 
  logOut(){
    let dialogObj ={
      header : 'Logout',
      title : 'Do You Want To Logout ?',
      cancelButton : 'Cancel',
      okButton : 'Logout'
      
    }
    const dialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '30%',
      data:dialogObj,
      disableClose : false
    })
    dialogRef.afterClosed().subscribe(res => {
      if(res == 'Yes'){
        this.clearLocalStorage();
      }
    })
  }

  clearLocalStorage() {
    localStorage.clear();
    sessionStorage.removeItem('loggedIn');
    this.commonMethods.routerLinkRedirect('/login');
  }

}
