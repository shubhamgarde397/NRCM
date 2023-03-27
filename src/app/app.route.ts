import { Routes } from '@angular/router';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

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
                }
            ]

        },
        { path: '**', redirectTo: '404' },
        { path: '404', component: PageNotFoundComponent },
    ];
