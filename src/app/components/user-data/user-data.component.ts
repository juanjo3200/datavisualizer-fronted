import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { EmailValidator, Validators } from '@angular/forms';
import { User } from '../models/user.entity';
import { MatDialog } from '@angular/material';
import { DialogContentComponent } from '../dialogContent/dialogContent.component';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  public user: User;
  public confirmPassword: string;
  constructor(private _userService: UserService, private _dialog: MatDialog) { 
  }

  ngOnInit() {
    let identity = JSON.parse(this._userService.getIdentity());
    this.user = new User(identity.name, identity.email, identity.password, identity.role);
    this.user.password = '';
    this.confirmPassword = '';
  }

  onSubmit(userdataForm){
    this._userService.update(this.user).subscribe(
      response => {
        if(response.token){
          this._userService.setIdentity(this.user);
          this._userService.setToken(response.token);
          this.openDialog("Los datos se han modificado correctamente", "green", "done");
        }else{
          this.openDialog("No se han podido modificar los datos correcamente", "red", "error");
        }
      },
      error => {
        this.openDialog("Error al modificar los datos", "red", "error");
        console.log(<any>error);
      }
    );
    this.user.password = '';
    this.confirmPassword = '';
    userdataForm.reset({name : this.user.name, email: this.user.email, password: this.user.password,
      confirmPass: this.confirmPassword});
  }

  openDialog(message, color, icon) {
    let dialogRef = this._dialog.open(DialogContentComponent, {
      data: { status: message, color: color, icon: icon },
    });
  }
}
