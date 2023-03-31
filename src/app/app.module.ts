import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from "./components/users/users.component";
import {ResourcesComponent} from "./components/resources/resources.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule, Routes } from "@angular/router";
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MainComponent } from './components/main/main.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

const appRoutes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'user/:id', component: UserDetailComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ResourcesComponent,
    UserDetailComponent,
    MainComponent,
    NavigationComponent
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
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
// @ts-ignore
export class AppModule {
}
