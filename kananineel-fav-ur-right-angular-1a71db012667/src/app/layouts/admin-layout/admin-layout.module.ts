import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { VenueOnBoardComponent } from 'src/app/pages/venue-on-board/venue-on-board.component';
import { UtilService } from 'src/app/utils/utilityService.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ApiService } from 'src/app/utils/api.service';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HelpDonatingComponent } from 'src/app/pages/help-donating/help-donating.component';
// import { ToastrModule } from 'ngx-toastr';
import { WindowService } from 'src/app/utils/window.service';

@NgModule({
  imports: [
  CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    FormsModule,
    ClipboardModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    VenueOnBoardComponent
  ],
  providers: [UtilService, UtilsService,ApiService,
    WindowService]
})

export class AdminLayoutModule {}
