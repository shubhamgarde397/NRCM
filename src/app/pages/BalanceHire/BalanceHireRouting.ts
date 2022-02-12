
import { Routes } from '@angular/router';
import { BalancehiredisplayComponent } from './balancehiredisplay/balancehiredisplay.component';
import { UpdateComponent } from './update/update.component';
import { UpdateSingleComponent } from './update-single/update-single.component';
import { BalanceHireAddComponent } from './balance-hire-add/balance-hire-add.component';
import { BalanceHireHandlerComponent } from './balance-hire-handler/balance-hire-handler.component';

export const BalanceHireRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'BALANCE_HIRE_HANDLER'
        },
        {
            path: 'BALANCE_HIRE_HANDLER',
            component: BalanceHireHandlerComponent,
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
                        path: 'BALANCE_HIRE_ADD',
                        component: BalanceHireAddComponent
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