import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { API } from '../config/db.config';
import { Md5 } from 'ts-md5/dist/md5';
import { Visualization } from '../../components/models/visualization.entity';
import { HttpParams } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class VizService {
    public url: string;
    constructor(private _http: Http, private userService: UserService) {
        this.url = API.url;
    }

    async addViz(viz: Visualization) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        let httpParams = new HttpParams;
        viz.databases.forEach(database => {
            httpParams = httpParams.append('database', database);
        });
        viz.options.forEach(opcion => {
            httpParams = httpParams.append(opcion.nombre, opcion.valor);
        });
        const equalViz = await this._http.get(this.url + 'viz/opciones?' + httpParams.toString(), { headers: headers });
        equalViz.subscribe(response => {
            const responseBody = response.json();
            let findViz = false;
            if (responseBody._id) {
                this.userService.getUserViz().subscribe(vizList => {
                    vizList.viz.forEach(visualization => {
                        if (visualization._id === responseBody._id) {
                            findViz = true;
                        }
                    });
                    if (!findViz) {
                        this.userService.addVizUser(responseBody).subscribe();
                    }
                });
            } else {
                const vizString = JSON.stringify(viz);
                const newViz = this._http.post(this.url + 'viz', vizString, { headers: headers });
                newViz.subscribe(responsePost => {
                    this.userService.addVizUser(responsePost.json()).subscribe();
                });
            }
        });
    }

    getVisualizations() {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return this._http.get(this.url + 'viz', { headers: headers }).map(res => res.json());
    }

    getVizById(id) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return this._http.get(this.url + 'viz/' + id, { headers: headers }).map(res => res.json());
    }
    updateVizById(viz) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        const params = JSON.stringify(viz);
        return this._http.put(this.url + 'viz/' + viz._id, params, { headers: headers });
    }

    deleteViz(viz) {
        let headers = new Headers({
            'Content-Type': 'application/json'
            , 'Authorization': this.getToken()
        });
        return this._http.delete(this.url + 'viz/' + viz._id, { headers: headers });
    }

    getToken() {
        return localStorage.getItem('token');
    }

    algoritmosKmeans() {
        return ['Kmeans', 'EM'];
    }

    algoritmosTest() {
        return ['Random Forest', 'Logistic Regression', 'LibSVM', 'Multilayer Perceptron'];
    }
}