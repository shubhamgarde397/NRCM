import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.route';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { getFullApi } from './common/services/ApiCalls/getFullApi.service';
import { handleFunction } from './common/services/functions/handleFunctions';
import { DrawerComponent } from './drawer/drawer.component';
import { HandleDataService } from './common/services/Data/handle-data.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ExcelService } from './common/services/sharedServices/excel.service';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule, 
  MatIconModule,
  MatSidenavModule
} from '@angular/material';
import { WhatsappTowhysappComponent } from './pages/whatsappTowhysapp/whatsapp-towhysapp/whatsapp-towhysapp.component';
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
import { PendingPaymentComponent } from './pages/TPTLogin/pending-payment/pending-payment.component';
import { TicketComponent } from './pages/TPTLogin/ticket/ticket.component';
import { TruckLoadingComponent } from './pages/TPTLogin/truck-loading/truck-loading.component';
import { DuesPageComponent } from './pages/Dues/dues-page/dues-page.component';
import { DuesFromAdvanceDisplayComponent } from './pages/CI/DuesFromAdvance/dues-from-advance-display/dues-from-advance-display.component';
import { DisplayComponent } from './pages/CI/JG/display/display.component';
import { GiftHandlerComponent } from './pages/CI/Gifts/gift-handler/gift-handler.component';
import { AddComponent } from './pages/EnvelopeEntries/add/add.component'
import {LRDisplayComponent} from './pages/LRsend/lrdisplay/lrdisplay.component';
import { DailyAccountAdderComponent } from './pages/CI/DailyAccount/daily-account-adder/daily-account-adder.component';
import { DisplaySequenceComponent } from './pages/CI/Sequence/display-sequence/display-sequence.component';
import { TrackDisplayComponent } from './pages/Track/track-display/track-display.component';
import { TrackLoginComponent } from './pages/Track/track-login/track-login.component';
import { AddqrComponent } from './pages/Track/addqr/addqr.component';
import { QrstatusComponent } from './pages/Track/qrstatus/qrstatus.component';
import { RentdisplayComponent } from './pages/CI/Rent/rentdisplay/rentdisplay.component';
import { ComdisplayComponent } from './pages/CI/Comm/comdisplay/comdisplay.component';
import { PODSTATComponent } from './pages/CI/POD-STATUS/podstat/podstat.component';
import { BalMsgComponent } from './pages/CI/MESSAGE/Balance/bal-msg/bal-msg.component';
import { PODNOTRECComponent } from './pages/CI/PODNotR/podnotrec/podnotrec.component';
import { TpdfComponent } from './pages/pdf/TPDF/tpdf/tpdf.component';
import { ReceiptComponent } from './pages/CI/PMTReceipt/receipt/receipt.component';
import { ContactDAddComponent } from './pages/CI/ContactDaily/contact-dadd/contact-dadd.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    WelcomePageComponent,
    DrawerComponent,
    PageNotFoundComponent,
    MainPageComponent,
    WhatsappTowhysappComponent,
    PDFComponent,
    TurnBookLocationDispComponent,
    HiddenTrucksComponent,
    WhatsappComponent,
    AccountDetailsDisplayComponent,
    PaymentPendingDisplayComponent,
    LinkTruckComponent,
    TPTNavigationComponent,
    TPTWelcomeComponent,
    TruckDetailsComponent,
    PersonalDetailsComponent,
    PendingPaymentComponent,
    LRDisplayComponent,
    TicketComponent,
    TruckLoadingComponent,
    DuesPageComponent,
    DuesFromAdvanceDisplayComponent,
    DisplayComponent,
    GiftHandlerComponent,
    AddComponent,
    DailyAccountAdderComponent,
    DisplaySequenceComponent,
    TrackDisplayComponent,
    TrackLoginComponent,
    AddqrComponent,
    QrstatusComponent,
    RentdisplayComponent,
    ComdisplayComponent,
    PODSTATComponent,
    BalMsgComponent,
    PODNOTRECComponent,
    TpdfComponent,
    ReceiptComponent,
    ContactDAddComponent
  ],
  imports: [
    QRCodeModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot()

  ],
  providers: [getFullApi, handleFunction, HandleDataService, ExcelService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
