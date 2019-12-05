import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './core/auth.service';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { MatDialogModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCasesComponent } from './user-cases/user-cases.component';
import { NewCaseComponent } from './new-case/new-case.component';

import { ToastrModule } from 'ngx-toastr';
import { LogsDialogComponent } from './logs-dialog/logs-dialog.component';
import { CaseResolveComponent } from './case-resolve/case-resolve.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    UserCasesComponent,
    NewCaseComponent,
    LogsDialogComponent,
    CaseResolveComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      disableTimeOut: true,
      tapToDismiss: false,
      positionClass: 'toast-top-right',
      enableHtml: true
    }),
    MatDialogModule
  ],
  providers: [AuthService, AngularFireAuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [LogsDialogComponent]
})
export class AppModule { }
