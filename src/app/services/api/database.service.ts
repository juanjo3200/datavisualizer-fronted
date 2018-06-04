import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { API } from '../config/db.config';
import { Md5 } from 'ts-md5/dist/md5';
import { Database } from '../../components/models/database.entity';
import { QueueDB } from '../../components/models/queueDB.entity';
@Injectable()
export class DatabaseService {
    public url: string;
    constructor(private _http: Http) {
        this.url = API.url;
    }

    async getDatabases() {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return await this._http.get(this.url + 'database', { headers: headers });

    }


    async deleteDatabase(database: Database) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return await this._http.delete(this.url + 'database/' + database._id, { headers: headers });
    }

    async createDatabase(database) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        const params = JSON.stringify(database);
        return await this._http.post(this.url + 'database', params, { headers: headers });

    }



    async getQueueDatabases() {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return await this._http.get(this.url + 'queueDB', { headers: headers });

    }

    getQueueDatabase(id) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return this._http.get(this.url + 'queueDB/' + id, { headers: headers });
    }
    async createQueueDB(queueDB: QueueDB) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        const params = JSON.stringify(queueDB);
        return await this._http.post(this.url + 'queueDB', params, { headers: headers });
    }

    async deleteQueueDB(queueDB: QueueDB) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return await this._http.delete(this.url + 'queueDB/' + queueDB._id, { headers: headers });

    }
    getToken() {
        return localStorage.getItem('token');
    }

    tiposCampos() {
        return ['Numérico', 'Clase'];
    }
}