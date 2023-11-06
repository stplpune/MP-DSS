import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.scss']
})
export class GlobalDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<GlobalDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
    ){

  }

  ngOnInit(): void {
    
    
  }

  closeDialog(result?: string) {
    this.dialogRef.close(result);
  }


}
