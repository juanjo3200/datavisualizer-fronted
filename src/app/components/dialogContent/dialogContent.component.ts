import { Component, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    template: `
    <span [style.color]="data.color"><mat-icon>{{data.icon}}</mat-icon>  {{data.status}}</span>
  `,
})
export class DialogContentComponent {
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, @Optional() public dialogRef: MatDialogRef<DialogContentComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}


