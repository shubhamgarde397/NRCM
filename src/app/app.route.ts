import { Routes } from '@angular/router';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DisplayComponent } from './pages/Account/display/display.component';
import { AddComponent } from './pages/EnvelopeEntries/add/add.component'
import { AccountDetailsDisplayComponent } from './pages/AccountDetails/account-details-display/account-details-display.component';

export const routes: Routes =
    [
        {
            path: '',
            component: MainPageComponent
        },   
        {
            path: 'Navigation',
            component: NavigationComponent,
            children:[
                {
                    path:'',
                    component:WelcomePageComponent
                },
                {
                    path:'NRCM_HOME',
                    component:WelcomePageComponent
                },
                {
                    path:'NRCM_ACCOUNT',
                    component:DisplayComponent
                },
                {
                    path: 'ACCOUNT_DETAILS_DISPLAY',
                    component:AccountDetailsDisplayComponent
                },
                {
                    path:'NRCM_TRANSPORT_ENVELOPE',
                    component:AddComponent
                }
            ]

        },
         {
            path: 'Login',
            component: LoginComponent
        },
        { path: '**', redirectTo: '404' },
        { path: '404', component: PageNotFoundComponent },
    ];
