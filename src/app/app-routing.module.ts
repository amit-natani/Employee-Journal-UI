import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { AddEntryComponent } from './_components/add-entry/add-entry.component';
import { ListEntriesComponent } from './_components/list-entries/list-entries.component';
import { AuthGuard } from './_guards/auth_guard';
import { LoginComponent } from './_components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-entry', component: AddEntryComponent, canActivate: [AuthGuard] },
  { path: 'user/worklogs', component: ListEntriesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
