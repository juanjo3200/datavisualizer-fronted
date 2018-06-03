import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { ImageGridComponent } from './components/imagegrid/imagegrid.component';
import { DatabasesComponent} from './components/databases/databases.component';
import { LogginGuard } from './services/guards/loggin.guard';
import { ProtectLogginGuard } from './services/guards/protectLoggin.guard';
import { QueueDbComponent } from './components/queue-db/queue-db.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminGuard } from './services/guards/admin.guard';
import { QueuedbDetailComponent } from './components/queuedb-detail/queuedb-detail.component';
import { QueuedbListComponent } from './components/queuedb-list/queuedb-list.component';
import { VizqueueListComponent } from './components/vizqueue-list/vizqueue-list.component';
import { VizqueueDetailComponent } from './components/vizqueue-detail/vizqueue-detail.component';
import { VizViewComponent } from './components/viz-view/viz-view.component';

const routes : Routes = [

  { path: 'login', component: LoginComponent, canActivate: [ProtectLogginGuard]},
  {
    path: 'home', component: HomeComponent,
    canActivate: [LogginGuard], children: [
      { path: '', redirectTo: 'imagegrid', pathMatch: 'full' },
      { path: 'imagegrid', component : ImageGridComponent},
      { path: 'vizView/:id', component: VizViewComponent },
      { path: 'userdata', component: UserDataComponent },
      { path: 'stepper', component: StepperComponent },
      { path: 'databases', component: DatabasesComponent },
      { path: 'queueDB', component: QueueDbComponent },
      { path: 'adminpanel', canActivate: [AdminGuard] , component: AdminPanelComponent, children:
      [
      { path: '', redirectTo: 'queuedblist', pathMatch: 'full' },
      { path: 'queuedblist', component: QueuedbListComponent },
      { path: 'queuedbdetail/:id', component: QueuedbDetailComponent },
      { path: 'vizqueuelist', component: VizqueueListComponent },
      { path: 'vizqueuedetail/:id', component: VizqueueDetailComponent }] }]
  },
  { path: 'register', component: RegisterComponent, canActivate: [ProtectLogginGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent}

];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }