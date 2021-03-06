import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AngularFireAuthGuard,  redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { HomePageComponent } from './home-page/home-page.component';
import { DoCharityComponent } from './do-charity/do-charity.component';
import { AccountComponent } from './account/account.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([''])
const routes: Routes = [
  {path:'', component:LoginPageComponent },
  {path:'home',component:HomePageComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectUnauthorizedToLogin },
  children: [
    {
      path: 'doCharity',
      component:DoCharityComponent
    },
    // {
    //   path: 'history',
    //   component:HistoryComponent
    // },
    {
      path: 'account',
      component:AccountComponent
    },
    {
      path: '',
      component:DoCharityComponent

    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
