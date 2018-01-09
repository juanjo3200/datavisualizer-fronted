import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidator } from './services/validator/equal-validate.directive';
import { UserService } from './services/user/user.service';
import { LogginGuard } from './services/guards/loggin.guard';
import { ProtectLogginGuard } from './services/guards/protectLoggin.guard';
import { EmailValidatorDirective } from './services/validator/emailUniq.directive';
import { UserDataComponent } from './components/user-data/user-data.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { AppMaterialModule } from './app.material.module';
import { DialogContentComponent } from './components/dialogContent/dialogContent.component';
import { ImageGridComponent } from './components/imagegrid/imagegrid.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    EqualValidator,
    EmailValidatorDirective,
    UserDataComponent,
    StepperComponent,
    DialogContentComponent,
    ImageGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  providers: [UserService, LogginGuard, ProtectLogginGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogContentComponent]
})
export class AppModule { }
