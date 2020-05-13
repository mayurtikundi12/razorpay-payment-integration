import { Routes } from '@angular/router';

// import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { BuyGiftCardComponent } from 'src/app/pages/buy-gift-card/buy-gift-card.component';
import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';
import { PhoneVerifierComponent } from 'src/app/pages/phone-verifier/phone-verifier.component';
import { HelpDonatingComponent } from 'src/app/pages/help-donating/help-donating.component';
import { MainComponent } from 'src/app/pages/main/main.component';
import { MainNewComponent } from 'src/app/pages/main-new/main-new.component';
import { BussinessLoginComponent } from 'src/app/pages/bussiness-login/bussiness-login.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'main',          component: MainNewComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'buy-gift-card/:id',  component: BuyGiftCardComponent },
    { path: 'checkout',  component: CheckoutComponent },
    { path: 'verify-phone',  component: PhoneVerifierComponent },
    { path: 'help-donating/:id',  component: HelpDonatingComponent },
    { path: 'business-login',  component: BussinessLoginComponent },
    { path: 'generate-password',  component: CreatePasswordComponent },
    { path: 'Update-Password',  component: ForgotPasswordComponent },
];
