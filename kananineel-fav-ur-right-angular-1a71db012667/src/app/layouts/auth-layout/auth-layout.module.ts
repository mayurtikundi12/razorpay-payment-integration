import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegisterComponent } from '../../pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ClipboardModule } from 'ngx-clipboard';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from 'src/app/utils/api.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { UtilService } from 'src/app/utils/utilityService.service';
import { BuyGiftCardComponent } from 'src/app/pages/buy-gift-card/buy-gift-card.component';
import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';
import { PhoneVerifierComponent } from 'src/app/pages/phone-verifier/phone-verifier.component';
import { HelpDonatingComponent } from 'src/app/pages/help-donating/help-donating.component';
import { MainNewComponent } from 'src/app/pages/main-new/main-new.component';
import { VenueListFilter } from 'src/app/commons/classes/pipes/venueFilter';
import { BussinessLoginComponent } from 'src/app/pages/bussiness-login/bussiness-login.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    FormsModule,
    ClipboardModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule
    // NgbModule
  ],
  declarations: [
    MainNewComponent,
    RegisterComponent,
    BuyGiftCardComponent,
    CheckoutComponent,
    PhoneVerifierComponent,
    HelpDonatingComponent,
    VenueListFilter,
    BussinessLoginComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent
  ],
  providers: [UtilService, UtilsService,ApiService]
})
export class AuthLayoutModule { }
