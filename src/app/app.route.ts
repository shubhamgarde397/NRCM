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
import { AccountDetailsDisplayComponent } from './pages/AccountDetails/account-details-display/account-details-display.component';
import { PaymentPendingDisplayComponent } from './pages/PaymentPendingDisplay/payment-pending-display/payment-pending-display.component';
import { LinkTruckComponent } from './pages/TPTLogin/link-truck/link-truck.component';
import { TPTNavigationComponent } from './pages/TPTLogin/tptnavigation/tptnavigation.component';
import { TPTWelcomeComponent } from './pages/TPTLogin/tptwelcome/tptwelcome.component';
import { TruckDetailsComponent } from './pages/TPTLogin/truck-details/truck-details.component';
import { PersonalDetailsComponent } from './pages/TPTLogin/personal-details/personal-details.component';
import { TicketComponent } from './pages/TPTLogin/ticket/ticket.component';
import { TruckLoadingComponent } from './pages/TPTLogin/truck-loading/truck-loading.component';
import { DuesPageComponent } from './pages/Dues/dues-page/dues-page.component';
import { DuesFromAdvanceDisplayComponent } from './pages/CI/DuesFromAdvance/dues-from-advance-display/dues-from-advance-display.component';

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
            path:'Transport_Navigation',
            component:TPTNavigationComponent,
            children:[
                {
                    path:'NRCM_TPT_HOME',
                    component:TPTWelcomeComponent
                },
                {
                    path:'TRUCK_DETAILS',
                    component:TruckDetailsComponent
                },
                {
                    path:'PERSONAL_DETAILS',
                    component:PersonalDetailsComponent
                },
                {
                    path:'TICKET_DETAILS',
                    component:TicketComponent
                },
                {
                    path:'LOADING_DETAILS',
                    component:TruckLoadingComponent
                }
            ]
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
                        path: 'TRANSPORT_HANDLER',
                        loadChildren: './pages/Transport/app.module#AppModule'
                    },
                    {
                        path: 'HIDDEN_OWNER_HANDLER',
                        component:HiddenTrucksComponent
                    },
                    {
                        path: 'DUES_PAGE',
                        component:DuesPageComponent
                    },
                    {
                        path: 'DUES_PAGE_ADVANCE',
                        component:DuesFromAdvanceDisplayComponent
                    },
                    {
                        path:'LINK_TRUCK',
                        component:LinkTruckComponent
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
                        path:'TICKET_HANDLER',
                        loadChildren:'./pages/Ticket/ticket.module#TicketModule'
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
                        path: 'ACCOUNT_DETAILS_DISPLAY',
                        component:AccountDetailsDisplayComponent
                    },
                    {
                        path: 'PENDING_PAYMENT_DISPLAY',
                        component:PaymentPendingDisplayComponent
                    },
                    {
                        path: 'PARTY_PAYMENT_HANDLER',
                        loadChildren: './pages/PartyPayment/app.module#AppModule'
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
