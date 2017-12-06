import { Injectable } from '@angular/core';
import {Http, Response , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {DB} from '../config/db.config';
import { Md5 } from 'ts-md5/dist/md5';
import { User } from '../../components/models/user';

@Injectable()
export class UserService{
    public url: string;
    constructor(private _http: Http){
        this.url = DB.url;
    }

    register(user){
        let hash = Md5.hashStr(user.password);
        let userNew = Object.assign(Object.create(user), user);
        userNew.password = hash;
        let params = JSON.stringify(userNew);
        let headers =  new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url + 'register', params, {headers: headers}).map(res => res.json());

    }

    checkEmail(email: String){
        return this._http.get(this.url+ 'checkemail/' + email );
    }

    login(user, gettoken = null){
        if(gettoken != null){
            user.gettoken = gettoken;
        }

        let userLogin = Object.assign(Object.create(user), user);
        userLogin.password = Md5.hashStr(userLogin.password);
        let params = JSON.stringify(userLogin);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'login', params, { headers: headers }).map(res => res.json());
    }

    update(user){
        if (!user.password) {
            delete user['password'];
        }else{
            let hash = Md5.hashStr(user.password);
            user = Object.assign(Object.create(user), user);
            user.password = hash;
        }

        let params = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json'
                                    , 'Authorization': this.getToken()});
        return this._http.put(this.url + 'update-user/' + JSON.parse(this.getIdentity()).email, params, { headers: headers })
            .map(res => res.json());
    }


    setIdentity(user: User ){
        if ( user ) {
            localStorage.setItem('identity', JSON.stringify(user));
        }
    }

    setToken(token: string){
        if (token) {
            localStorage.setItem('token', token);
        }
    }

    getIdentity(){
        return localStorage.getItem('identity');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logout(){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
    }
}
