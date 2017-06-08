import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// account
import { User } from '../auth/_models/index';
import { UserService } from '../auth/_services/index';

import { Blog } from '../blog';
import { BlogService } from '../service/blog.service';

// import { AuthService, AppGlobals } from 'angular2-google-login';
// import { AuthService } from "angular2-social-login";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
	blogs : Blog[];
	title = 'app works!';
	// user
	currentUser: User;
	data : any = {};

	sub  : any;

	constructor(
		private blogService : BlogService,
		// private _googleAuth: AuthService,
		// user
		private userService: UserService,
		private router: Router,
		// public _auth: AuthService,
		){
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		
	}

	loginGoogle(provider) : void {
		// this._googleAuth.authenticateUser(()=>{
		// 	console.log('=======> google')
		// });
		// this.sub = this._auth.login(provider).subscribe((data) => {
  //         	console.log(data);
  //       })
	}

	ngOnInit(): void{
		// AppGlobals.GOOGLE_CLIENT_ID = 'FLt9ZzcWmCMfoQANAYfi_2g5';

		if(this.currentUser != null) {
			this.userService.getUser(this.currentUser.username).then(data =>{
				this.data = data;
				this.router.navigateByUrl('/');
			});
		}
	}
}
