import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SharedService } from '../utils/shared-service.service';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent {
  dialogText:any = {
    title : 'Error',
    description : 'Please check connection.',
    isInfoDialog : false,
    headerBgClass : 'colored-success-header',
    headerIcon : 'tag-success-popup'
  };

  constructor(public dialogRef: MatDialogRef<CustomDialogComponent>,  private sharedService: SharedService) {
    // console.log("this.sharedService.dialogText: ", this.sharedService.dialogText);
    if(this.sharedService.dialogText != undefined)
    {
      if(this.sharedService.dialogText.title != undefined)

      {
        this.dialogText.title = this.sharedService.dialogText.title;
      }

      if(this.sharedService.dialogText.description != undefined)
      {
        this.dialogText.description = this.sharedService.dialogText.description;
      }

      if(this.sharedService.dialogText.isInfoDialog != undefined)
      {
        this.dialogText.isInfoDialog = this.sharedService.dialogText.isInfoDialog;
      }

      if(this.sharedService.dialogText.headerBgClass != undefined)
      {
        this.dialogText.headerBgClass = this.sharedService.dialogText.headerBgClass;
      }

      if(this.sharedService.dialogText.headerIcon != undefined)
      {
        this.dialogText.headerIcon = this.sharedService.dialogText.headerIcon;
      }
    }
  }

}
