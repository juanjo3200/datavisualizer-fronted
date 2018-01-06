import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from './components/register/register.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { ImageGridComponent } from './components/imagegrid/imagegrid.component';
import { LogginGuard } from './services/guards/loggin.guard';
import { ProtectLogginGuard } from './services/guards/protectLoggin.guard';

const routes : Routes = [

  { path: 'login', component: LoginComponent, canActivate: [ProtectLogginGuard]},
  {
    path: 'home', component: HomeComponent,
    canActivate: [LogginGuard], children: [
      { path: '', redirectTo: 'imagegrid', pathMatch: 'full' },
      { path: 'imagegrid', component : ImageGridComponent},
      { path: 'userdata', component: UserDataComponent },
      { path: 'stepper', component: StepperComponent }]
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