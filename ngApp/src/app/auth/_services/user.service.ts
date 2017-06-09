import { Injectable } from '@angular/core';
import { Location }   from '@angular/common';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http, location: Location,) { 
        this.url_http = window.location.origin + '/';
        console.log(this.url_http)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    // private http_url = 'http://localhost:2000/';
    private url_http : string;

    getUser(username : string) : Promise<number>{
        let url = this.url_http + 'profile/?username=' + username;
        return this.http.get(url).toPromise().then(res => res.json().data).catch(this.handleError);
    }

    // update profile
    update_profile(data : any, birthday : string) : Promise<number>{
        let fd: FormData = new FormData();
        fd.append('username', data.username);
        fd.append('fullname', data.fullname);
        fd.append('gender', data.gender);
        fd.append('birthday', birthday);
        fd.append('image', data.image);
        // const url = `${this.url_http}blogs/updated/${blog.id}/`;
        const url = this.url_http + 'profile/updated/';
        // return this.http.post(url, fd, {headers: this.headers}).toPromise().then(() => blog).catch(this.handleError);
        return this.http.post(url, fd).toPromise().then(res => res.json().result);
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        const url = this.url_http + 'accounts/register/';
        return this.http.post(url, user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}