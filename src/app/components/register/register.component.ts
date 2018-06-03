import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailValidator, Validators } from '@angular/forms';
import { User } from '../models/user.entity';
import { UserService } from '../../services/api/user.service';
import { MatDialog } from '@angular/material';
import { DialogContentComponent } from '../dialogContent/dialogContent.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: User;
  public confirmPassword: String;
  constructor(private _userService: UserService, private _dialog: MatDialog) { }

  ngOnInit() {
    this.user = new User( '', '', '', 'ROLE_USER');
    this.confirmPassword = '';
  }
  onSubmit(registerForm){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user){
          this.openDialog("La cuenta se ha creado correctamente", "green", "done");
          registerForm.reset();
          this.user = new User( '', '', '', 'ROLE_USER');
        }else{
          this.openDialog("Error al crear la cuenta", "red", "error");
        }
      },
      error => {
        console.log(<any> error);
      }
    );
  }

  openDialog(message, color, icon) {
    let dialogRef = this._dialog.open(DialogContentComponent, {
      data: { status: message, color: color , icon : icon},
    });
  }
}
