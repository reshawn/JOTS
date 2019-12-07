import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { ProfileComponent } from './profile/profile.component';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserCasesComponent } from './user-cases/user-cases.component';
import { NewCaseComponent } from './new-case/new-case.component';
import { CaseResolveComponent } from './case-resolve/case-resolve.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'login' },
{ path: 'login', component: LoginComponent },
// { path: 'profile', component: ProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
{ path: 'viewCases', component: UserCasesComponent },
{ path: 'new-case', component: NewCaseComponent },
{ path: 'case-resolve', component: CaseResolveComponent }
  //{ path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
