import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { User } from '../models/user.entity';
import { UserService } from '../../services/api/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { DialogContentComponent } from '../dialogContent/dialogContent.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public identity: User;
  public token : string;
  constructor(private _userService: UserService,
    private router: Router, private _dialog: MatDialog) { }

  ngOnInit() {
    this.user = new User( '', '', '', 'ROLE_USER');
  }

  onSubmit(loginForm){
    this._userService.login(this.user).subscribe(
      response => {
        if (response.user) {
          this.identity = response.user;
          this._userService.setIdentity(this.identity);
          this._userService.login(this.user, 'true').subscribe(
            response => {
              this.token = response.token;
              this._userService.setToken(this.token);
              this.router.navigate(['home']);
            }, error =>{
              console.log(<any>error);
            }
          )
        } else {
          this.user = new User( '', '', '', 'ROLE_USER');
        }
      },
      error => {
        if(error._body){
          let body = JSON.parse(error._body);
          if(body.message){
            this.openDialog(body.message);
          }
        }else{
          console.log(<any>error);
        }
      }
    );
  }

  openDialog(message) {
    let dialogRef = this._dialog.open(DialogContentComponent, {
      data: { status: message , color: "red", icon: "error"},
    });
  }
}

