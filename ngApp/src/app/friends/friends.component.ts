import 'rxjs/add/operator/switchMap';
import { Component, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit }      from '@angular/core';
import { trigger, state, style, animate, transition } from 'angular-animate';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//notification
import { NotificationsService } from 'angular2-notifications';
import { PushNotificationsService } from 'angular2-notifications';

import { Blog }        from '../blog';
import { BlogService } from '../service/blog.service';
// account
import { User } from '../auth/_models/index';
import { UserService } from '../auth/_services/index';

@Component({
	selector: 'list-friend',
	templateUrl: './friends.component.html',
	providers: []
})

export class FriendsComponent implements OnInit{
	blog : Blog;
	files : File;
	// user
	currentUser: User;
	check : boolean;

	friends : any;
	// notification
	public options = {
		position: ["bottom", "right"],
		timeOut: 5000,
		lastOnBottom: false,
		showProgressBar: true,
		pauseOnHover: true,
		clickToClose: true,
		animate : "scale",
		maxStack : 5,
	}

	constructor(
		private blogService: BlogService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private _pushNotifications: PushNotificationsService,
		private _service: NotificationsService,
		// user
		private userService: UserService
	){
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}

	ngOnInit() : void{
		this.getAllFriends();
	}

	getAllFriends() : void{
		this.blogService.getAllFriends(this.currentUser.id).then(data =>{
			if(data.result > 0){
				this.friends = data.data;
			}
		});
	}

	unfriend(id) : void{
		this.blogService.unfriend(id).then(data =>{
			console.log('========> ahihi', data)
			if(data > 0){
				console.log('YES')
				this._service.success('Notification', 'Unfriend successfully!');
				this.getAllFriends();
			} else{
				console.log('No')
				this._service.warn('Notification', 'Error');
			}
		});
	}
}