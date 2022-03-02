import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WhatsappTowhysappComponent } from './pages/whatsappTowhysapp/whatsapp-towhysapp/whatsapp-towhysapp.component';
import { PDFComponent } from './pages/pdf/pdf.component';
import { C2wComponent } from './pages/C2W/c2w/c2w.component';
import { TurnBookLocationDispComponent } from './pages/TurnbookLocation/turn-book-location-disp/turn-book-location-disp.component';
import { HiddenTrucksComponent } from './pages/Hidden/Trucks/hidden-trucks/hidden-trucks.component';
import { WhatsappComponent } from './pages/Whatsapp/whatsapp/whatsapp.component';
import { QRCodeComponent } from './pages/QR/qrcode/qrcode.component';
import { QRUpdateComponent } from './pages/QR/qrupdate/qrupdate.component';

export const routes: Routes =
    [
        {
            path: '',
            component: MainPageComponent
        },
        {
            path: 'Register',
            component: RegisterComponent
        },
        {
            path: 'Login',
            component: LoginComponent
        },
        {
            path: 'Whatsapp',
            component: WhatsappComponent
        },
        {
            path: 'WhysApp',
            component: WhatsappTowhysappComponent
        },
        {
            path: 'Navigation',
            component: NavigationComponent,

            children:
                [
                    {
                        path: 'NRCM_HOME',
                        component: WelcomePageComponent
                    },
                    {
                        path: 'GST_HANDLER',
                        loadChildren: './pages/GST/app.module#AppModule'
                    },
                    {
                        path: 'OWNER_HANDLER',
                        loadChildren: './pages/OwnerDetails/app.module#OwnerModule'
                    },
                    {
                        path: 'HIDDEN_OWNER_HANDLER',
                        component:HiddenTrucksComponent
                    },
                    {
                        path: 'IMP_GST_HANDLER',
                        loadChildren: './pages/ImpGST/app.module#AppModule'
                    },
                    {
                        path: 'VILLAGE_HANDLER',
                        loadChildren: './pages/Village/app.module#AppModule'
                    },
                    {
                        path:'REASON_HANDLER',
                        loadChildren: './pages/MissingReason/app.module#AppModule'
                    },
                    {
                        path: 'CHART',
                        loadChildren: './pages/Charts/bar-chart/app.module#AppModule'
                    },
                    {
                        path: 'OTHER_REPORT',
                        loadChildren: './pages/Report/generate-report/app.module#AppModule'
                    },
                    {
                        path: 'MAIL_DISPLAY',
                        loadChildren: './pages/Mail/mail-display/app.module#AppModule'
                    },
                    {
                        path:'MISSING_LR',
                        loadChildren: './pages/MissingLRNOS/missing-display/app.module#AppModule'
                    },

                    {
                        path: 'BALANCE_HIRE_HANDLER',
                        loadChildren: './pages/BalanceHire/app.module#AppModule'
                    },
                    {
                        path: 'TURN_BOOK_HANDLER',
                        loadChildren: './pages/TurnBook/turn-book.module#TurnBookModule'
                    },
                    {
                        path: 'TURN_BOOK_LOCATION_DISP',
                        component:TurnBookLocationDispComponent
                    },
                    {
                        path: 'PARTY_PAYMENT_HANDLER',
                        loadChildren: './pages/PartyPayment/app.module#AppModule'
                    },
                    {
                        path: 'QR_HANDLER',
                        component:QRCodeComponent
                    },
                    {
                        path: 'QRUpdate',
                        component:QRUpdateComponent
                    },
                    {
                        path: 'Email_Handler',
                        loadChildren: './pages/Email/app.module#AppModule'
                    },
                    {
                        path: 'PDF',
                        component: PDFComponent
                    },
                    {
                        path: 'C2W',
                        component: C2wComponent
                    }
                ]
        },
        { path: '**', redirectTo: '404' },
        { path: '404', component: PageNotFoundComponent },
    ];
