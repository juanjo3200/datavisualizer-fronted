import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { API } from '../config/db.config';
import { Md5 } from 'ts-md5/dist/md5';
import { User } from '../../components/models/user.entity';

@Injectable()
export class UserService {
    public url: string;
    constructor(private _http: Http) {
        this.url = API.url;
    }

    register(user) {
        const hash = Md5.hashStr(user.password);
        const userNew = Object.assign(Object.create(user), user);
        userNew.password = hash;
        const params = JSON.stringify(userNew);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.url + 'user/register', params, { headers: headers }).map(res => res.json());

    }

    checkEmail(email: String) {
        return this._http.get(this.url + 'user/checkemail/' + email);
    }

    login(user, gettoken = null) {
        if (gettoken != null) {
            user.gettoken = gettoken;
        }

        const userLogin = Object.assign(Object.create(user), user);
        userLogin.password = Md5.hashStr(userLogin.password);
        const params = JSON.stringify(userLogin);

        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'user/login', params, { headers: headers }).map(res => res.json());
    }

    update(user) {
        if (!user.password) {
            delete user['password'];
        } else {
            const hash = Md5.hashStr(user.password);
            user = Object.assign(Object.create(user), user);
            user.password = hash;
        }

        const params = JSON.stringify(user);
        const headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return this._http.put(this.url + 'user/update-user/' + JSON.parse(this.getIdentity()).email, params, { headers: headers })
            .map(res => res.json());
    }

    addVizUser(viz) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });

        const identity = this.getIdentity();
        const mail = JSON.parse(localStorage.getItem('identity')).email;
        const params = JSON.stringify(viz);
        return this._http.post(this.url + 'user/viz/' + mail, params, { headers: headers }).map(res => res.json());

    }

    getUserViz() {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });

        const identity = this.getIdentity();
        const mail = JSON.parse(localStorage.getItem('identity')).email;
        return this._http.get(this.url + 'user/viz/' + mail, { headers: headers }).map(res => res.json());

    }


    setIdentity(user: User) {
        if (user) {
            localStorage.setItem('identity', JSON.stringify(user));
        }
    }

    setToken(token: string) {
        if (token) {
            localStorage.setItem('token', token);
        }
    }

    getIdentity() {
        return localStorage.getItem('identity');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAdmin() {
        return (JSON.parse(localStorage.getItem('identity')).role === 'ADMIN');
    }

    logout() {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
    }
}
