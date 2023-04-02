import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from "./components/users/users.component";
import {ResourcesComponent} from "./components/resources/resources.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule, Routes } from "@angular/router";
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MainComponent } from './components/main/main.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from "@angular/material/card";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {AuthInterceptor} from "./services/auth.interceptor";

const appRoutes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ResourcesComponent,
    UserDetailComponent,
    MainComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [
    AppComponent,
  ]
})
// @ts-ignore
export class AppModule {
}
