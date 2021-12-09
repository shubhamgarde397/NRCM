
import { Routes } from '@angular/router';
import { BalancehiredisplayComponent } from './balancehiredisplay/balancehiredisplay.component';
import { UpdateComponent } from './update/update.component';
import { UpdateSingleComponent } from './update-single/update-single.component';

export const BalanceHireRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'BALANCE_HIRE_HANDLER'
        },
        {
            path: 'BALANCE_HIRE_HANDLER',
            component: BalancehiredisplayComponent,
            children:
                [
                    {
                        path: '',
                        component: BalancehiredisplayComponent
                    },
                    {
                        path: 'BalanceHireDisp',
                        component: BalancehiredisplayComponent
                    },
                    {
                        path: 'Update',
                        component: UpdateComponent
                    }
                    ,
                    {
                        path: 'UpdateSingle',
                        component: UpdateSingleComponent
                    }

                ]
        }
    ]