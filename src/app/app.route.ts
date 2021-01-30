import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { informationComponent } from './pages/information/information.component';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ChangeComponent } from './pages/Change/change/change.component';
import { WhatsappTowhysappComponent } from './pages/whatsappTowhysapp/whatsapp-towhysapp/whatsapp-towhysapp.component';
import { MonthNamesComponent } from './pages/month-names/month-names.component';
import { PDFComponent } from './pages/pdf/pdf.component';
import { C2wComponent } from './pages/C2W/c2w/c2w.component';

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
            path: 'WhysApp',
            component: WhatsappTowhysappComponent
        },
        {
            path: 'Change',
            component: ChangeComponent
        },
        {
            path: 'Navigation',
            component: NavigationComponent,

            children:
                [

                    // {
                    //     path: '',
                    //     component: WelcomePageComponent
                    // },
                    {
                        path: 'NRCM_HOME',
                        component: WelcomePageComponent
                    },
                    {
                        path: 'Information',
                        component: informationComponent,
                        children:
                            [
                                {
                                    path: 'GST_HANDLER',
                                    loadChildren: './pages/GST/app.module#AppModule'
                                },
                                {
                                    path: 'OWNER_HANDLER',
                                    loadChildren: './pages/OwnerDetails/app.module#OwnerModule'
                                },
                                {
                                    path: 'IMP_GST_HANDLER',
                                    loadChildren: './pages/ImpGST/app.module#AppModule'
                                },
                                {
                                    path: 'REGULAR_PARTY_HANDLER',
                                    loadChildren: './pages/RegularParty/app.module#AppModule'
                                },
                                {
                                    path: 'DRIVER_HANDLER',
                                    loadChildren: './pages/DriverDetails/app.module#AppModule'
                                },
                                {
                                    path: 'VILLAGE_HANDLER',
                                    loadChildren: './pages/Village/app.module#AppModule'
                                },
                                {
                                    path: 'REGULAR_TRUCK_HANDLER',
                                    loadChildren: './pages/RegularTruck/app.module#AppModule'
                                },
                                {
                                    path: 'BANKDETAILS_HANDLER',
                                    loadChildren: './pages/BankDetails/bank-details.module#BankDetailsModule'
                                },
                                {
                                    path: 'TRUCKBANKDETAILS_HANDLER',
                                    loadChildren: './pages/BankTruckDetails/bank-truck-details.module#BankTruckDetailsModule'
                                },
                                {
                                    path: 'BANKNAME_HANDLER',
                                    loadChildren: './pages/BankName/bank-name.module#BankNameModule'
                                },
                                {
                                    path: 'OWNER_DETAILED_HANDLER',
                                    loadChildren: './pages/BankName/bank-name.module#BankNameModule'
                                },
                                {
                                    path: 'MonthName_Handler',
                                    component: MonthNamesComponent
                                }
                            ]
                    },


                    {
                        path: 'BALANCE_HIRE_HANDLER',
                        loadChildren: './pages/BalanceHire/app.module#AppModule'
                    },
                    // {
                    //     path: 'BALANCE_HIRE_ADMIN_HANDLER',//yet to configure
                    //     loadChildren: './pages/DailyData/daily-data.module#DailyDataModule'//yet to configure
                    // },
                    {
                        path: 'Finolex_Handler',
                        loadChildren: './pages/Company/Finolex/Finolex.module#FinolexModule'
                    },

                    {
                        path: 'Booking_Handler',
                        loadChildren: './pages/Booking/booking.module#BookingModule'
                    },
                    {
                        path: 'LRNumber_HANDLER',
                        loadChildren: './pages/LRNumber/lr.module#LRModule'
                    },
                    {
                        path: 'TURN_BOOK_HANDLER',
                        loadChildren: './pages/TurnBook/turn-book.module#TurnBookModule'
                    },
                    {
                        path: 'BCE_HANDLER',
                        loadChildren: './pages/BookingCashExpenses/bce.module#BCEModule'
                    },
                    {
                        path: 'DailyData_HANDLER',
                        loadChildren: './pages/DailyData/daily-data.module#DailyDataModule'
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
                    },
                    {
                        path: 'TPTHire_HANDLER',
                        loadChildren: './pages/TransportHireDetails/tpt-hire-details.module#TptHireDetailsModule'
                    },
                    {
                        path: 'AdvanceAccount',
                        loadChildren: './pages/advance-account/advance-account.module#AdvanceAccountModule'
                    },
                    {
                        path: 'BOOKING_OTHER_HANDLER',
                        loadChildren: './pages/BookingOther/app.module#AppModule'
                    },
                    {
                        path: 'PochAccount',
                        loadChildren: './pages/PochAccount/poch-account.module#PochAccountModule'
                    },
                    {
                        path: 'CanaraBankNeft_HANDLER',
                        loadChildren: './pages/NEFT/CanaraBank/canara-bank.module#CanaraBankModule'
                    },
                    {
                        path: 'CanaraBankPayment_HANDLER',
                        loadChildren: './pages/NEFT/CanaraBankPayment/canara-bank-payment.module#CanaraBankPaymentModule'
                    },
                    {
                        path: 'Truck_CASH_EXPENSES_HANDLER',
                        loadChildren: './pages/CashExpenses/cash-expenses.module#CashExpensesModule'
                    },
                    {
                        path: 'NotificationLL',
                        loadChildren: './pages/Notification/app.module#AppModule'
                    }
                ]
        },
        { path: '**', redirectTo: '404' },
        { path: '404', component: PageNotFoundComponent },
    ];
