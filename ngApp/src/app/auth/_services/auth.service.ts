import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    constructor(
        private http: Http,
        private router: Router,
    ) { }

    private http_url = 'http://localhost:2000/';

    login(username: string, password: string) {
        const url = this.http_url + 'accounts/login/';

        let fd: any = new FormData();
        fd.append('username', username);
        fd.append('password', password);

        return this.http.post(url, fd)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();
            if(user.result > 0){
                if (user && user.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.data));
                    this.router.navigateByUrl('/');
                }
            } else if(user.result == 0){
                console.log('Error account')
            } else{
                console.log('Error!')
            }

        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigateByUrl('/login');
    }
}