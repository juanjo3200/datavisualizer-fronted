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
import { UserService } from './services/api/user.service';
import { LogginGuard } from './services/guards/loggin.guard';
import { ProtectLogginGuard } from './services/guards/protectLoggin.guard';
import { EmailValidatorDirective } from './services/validator/emailUniq.directive';
import { UserDataComponent } from './components/user-data/user-data.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { AppMaterialModule } from './app.material.module';
import { DialogContentComponent } from './components/dialogContent/dialogContent.component';
import { ImageGridComponent } from './components/imagegrid/imagegrid.component';
import { DatabaseService } from './services/api/database.service';
import { DatabasesComponent } from './components/databases/databases.component';
import { QueueDbComponent } from './components/queue-db/queue-db.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminGuard } from './services/guards/admin.guard';
import { QueuedbDetailComponent } from './components/queuedb-detail/queuedb-detail.component';
import { QueuedbListComponent } from './components/queuedb-list/queuedb-list.component';
import { VizqueueDetailComponent } from './components/vizqueue-detail/vizqueue-detail.component';
import { VizqueueListComponent } from './components/vizqueue-list/vizqueue-list.component';
import { VizService } from './services/api/viz.service';
import { VizViewComponent } from './components/viz-view/viz-view.component';
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
    ImageGridComponent,
    DatabasesComponent,
    QueueDbComponent,
    AdminPanelComponent,
    QueuedbDetailComponent,
    QueuedbListComponent,
    VizqueueDetailComponent,
    VizqueueListComponent,
    VizViewComponent
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
  providers: [UserService, LogginGuard, AdminGuard, ProtectLogginGuard, DatabaseService, VizService],
  bootstrap: [AppComponent],
  entryComponents: [DialogContentComponent]
})
export class AppModule { }
