import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { AddEntryComponent } from './_components/add-entry/add-entry.component';
import { ListEntriesComponent } from './_components/list-entries/list-entries.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth_guard';
import { FeedbackDashboardComponent } from './_components/feedback-dashboard/feedback-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/worklog-dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'worklog-dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'feedback-dashboard', component: FeedbackDashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-entry', component: AddEntryComponent, canActivate: [AuthGuard] },
  { path: 'user/worklogs', component: ListEntriesComponent, canActivate: [AuthGuard] },
  { path: 'user/feedbacks', component: ListEntriesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
