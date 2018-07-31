import {Routes} from '@angular/router'

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';

import { AuthGuardService } from './service/authGuard.service';

export const appRoutes:Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'chat', component: ChatComponent,  canActivate: [AuthGuardService] },
    { path: '**', component: LoginComponent },
    
];


// export default appRoutes;