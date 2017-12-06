import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public status: String;
  public identity: User;
  public token : string;
  constructor(private _userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = new User( '', '', '', 'ROLE_USER');
    this.status = '';
  }

  onSubmit(loginForm){
    this.status = '';
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
            this.status = body.message;
          }
        }else{
          console.log(<any>error);
        }
      }
    );
  }
}
