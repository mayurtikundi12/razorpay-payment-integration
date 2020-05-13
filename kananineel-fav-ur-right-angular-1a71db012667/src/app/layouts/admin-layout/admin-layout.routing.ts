import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { VenueOnBoardComponent } from 'src/app/pages/venue-on-board/venue-on-board.component';
import { HelpDonatingComponent } from 'src/app/pages/help-donating/help-donating.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',component: DashboardComponent },
    { path: 'venue', component: VenueOnBoardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent }
];
