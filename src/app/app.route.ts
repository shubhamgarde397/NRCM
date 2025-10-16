import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PDFComponent } from './pages/pdf/pdf.component';
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
import { TruckLoadingComponent } from './pages/TPTLogin/truck-loading/truck-loading.component';
import { DuesPageComponent } from './pages/Dues/dues-page/dues-page.component';
import { DuesFromAdvanceDisplayComponent } from './pages/CI/DuesFromAdvance/dues-from-advance-display/dues-from-advance-display.component';
import { DisplayComponent } from './pages/CI/FROD/display/display.component';
import { AddComponent } from './pages/EnvelopeEntries/add/add.component'
import { DisplaySequenceComponent } from './pages/CI/Sequence/display-sequence/display-sequence.component'
import { LRDisplayComponent } from './pages/LRsend/lrdisplay/lrdisplay.component';
import { DailyAccountAdderComponent } from './pages/CI/DailyAccount/daily-account-adder/daily-account-adder.component';
import { TrackDisplayComponent } from './pages/Track/track-display/track-display.component';
import { RentdisplayComponent } from './pages/CI/Rent/rentdisplay/rentdisplay.component';
import { ComdisplayComponent } from './pages/CI/Comm/comdisplay/comdisplay.component';
import { BalMsgComponent } from './pages/CI/MESSAGE/Balance/bal-msg/bal-msg.component';
import { PODNOTRECComponent } from './pages/CI/PODNotR/podnotrec/podnotrec.component';
import { TpdfComponent } from './pages/pdf/TPDF/tpdf/tpdf.component';
import { ReceiptComponent } from './pages/CI/PMTReceipt/receipt/receipt.component';
import { DriverContactComponent } from './pages/CI/DriverContact/driver-contact/driver-contact.component';
import { PmtMsgComponent } from './pages/Track/pmt-msg/pmt-msg.component';
import { ProfileComponent } from './pages/CI/Profile/profile/profile.component';
import { QRLoginComponent } from './pages/QRLogin/qrlogin/qrlogin.component';
import { QRGeneratorComponent } from './pages/QRGenerator/qrgenerator/qrgenerator.component';
import { RegisterQRComponent } from './pages/registerQR/register-qr/register-qr.component';
 
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
            path: 'QR',
            component: TrackDisplayComponent
        },
        {
            path: 'PM',
            component: PmtMsgComponent
        },
        {
            path: 'Register',
            component: RegisterQRComponent
        },

        {
            path: 'QL',
            component: QRLoginComponent
        },
        {
            path: 'PDF',
            component: TpdfComponent
        },
        {
            path: 'Whatsapp',
            component: WhatsappComponent
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
                        path: 'PMTRCT',
                        component: ReceiptComponent
                    },
                    {
                        path: 'CONTACT_DAILY',
                        component: ReceiptComponent
                    },
                    {
                        path: 'PROFILE',
                        component: ProfileComponent
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
                        path:'ContactDriver',
                        component:DriverContactComponent
                    },
                    {
                        path: 'DUES_PAGE',
                        component:DuesPageComponent
                    },
                    {
                        path: 'SEQUENCE',
                        component:DisplaySequenceComponent
                    },
                    {
                        path: 'RENT_HANDLER',
                        component:RentdisplayComponent
                    },
                    {
                        path: 'Comm',
                        component:ComdisplayComponent
                    },
                    {
                        path: 'DUES_PAGE_ADVANCE',
                        component:DuesFromAdvanceDisplayComponent
                    },
                    {
                        path:'DAILY_ACCOUNT_ADDER',
                        component:DailyAccountAdderComponent
                    },
                    {
                        path: 'FROD',
                        component:DisplayComponent
                    },
                    {
                        path:'LINK_TRUCK',
                        component:LinkTruckComponent
                    },
                    {
                        path:'QRGenerator',
                        component:QRGeneratorComponent
                    },
                    {
                        path: 'IMP_GST_HANDLER',
                        loadChildren: './pages/ImpGST/app.module#AppModule'
                    },
                    {
                        path: 'DIGILR',
                        loadChildren: './pages/MAINPAGE/LRMaker/app.module#AppModule'
                    },
                    {
                        path: 'VILLAGE_HANDLER',
                        loadChildren: './pages/Village/app.module#AppModule'
                    },
                    {
                        path: 'CHART',
                        loadChildren: './pages/Charts/bar-chart/app.module#AppModule'
                    },
                    {
                        path: 'MAIL_DISPLAY',
                        loadChildren: './pages/Mail/mail-display/app.module#AppModule'
                    },
                    {
                        path: 'BALANCE_HIRE_HANDLER',
                        loadChildren: './pages/BalanceHire/app.module#AppModule'
                    },
                    {
                        path: 'POCH_COLLECTION_HANDLER',
                        loadChildren: './pages/PochCollection/app.module#AppModule'
                    },
                    {
                        path:'PODNOTREC',
                        component:PODNOTRECComponent
                    },
                    {
                        path: 'TURN_BOOK_HANDLER',
                        loadChildren: './pages/TurnBook/turn-book.module#TurnBookModule'
                    },
                    {
                        path:'Load_HANDLER',
                        loadChildren:'./pages/LorryLoadDetails/app.module#AppModule'
                    },
                    {
                        path: 'TURN_BOOK_LOCATION_DISP',
                        component:TurnBookLocationDispComponent
                    },
                    {
                        path: 'MESSAGE',
                        component:BalMsgComponent
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
                        path: 'PDF',
                        component: PDFComponent
                    },
                    {
                        path:'NRCM_TRANSPORT_ENVELOPE',
                        component:AddComponent
                    },
                    {
                        path:'LR_Display',
                        component:LRDisplayComponent
                    },
                    {
                        path: 'PAYMENT_HANDLER',
                        loadChildren: './pages/DailyPayments/payment.module#PaymentModule'
                    }
                ]
        },
        // { path: '**', redirectTo: '404' },
        // { path: '404', component: PageNotFoundComponent },
    ];
