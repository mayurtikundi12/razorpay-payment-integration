import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UtilService } from './utils/utilityService.service';
import { SharedService } from './utils/shared-service.service';
import { UtilsService } from './utils/utils.service';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CustomDialogComponent
  ],
  providers: [UtilService, SharedService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
