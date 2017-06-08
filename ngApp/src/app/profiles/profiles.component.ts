import { Component, OnInit, EventEmitter }      from '@angular/core';
import { trigger, state, style, animate, transition } from 'angular-animate';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//notification
import { NotificationsService } from 'angular2-notifications';
import { PushNotificationsService } from 'angular2-notifications';

import { Blog } from '../blog';
import { BlogService } from '../service/blog.service';
// account
import { User } from '../auth/_models/index';
import { UserService } from '../auth/_services/index';
// datepicker
import { DatePickerOptions, DateModel } from 'ng2-datepicker';


@Component({
	selector: 'profiles',
	templateUrl: './profiles.component.html',
})
export class ProfilesComponent implements OnInit{
	// user
	currentUser: User;
	data : any = {
		image: File,
	};

	date: DateModel;
	opt: DatePickerOptions;
	yourModelDate : any;
	files : File;

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
		private userService: UserService,
		private blogService : BlogService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private _pushNotifications: PushNotificationsService,
		private _service: NotificationsService,
		){
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.opt = new DatePickerOptions();
	}

	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.blogService.profile(+params['id']))
		.subscribe(data => {
			// this.blog = blog;
			// if(this.blog.created_by == this.currentUser.username){
			// 	this.check = false;
			// } else{
			// 	this.check = true;
			// }
			this.data = data.data;
			this.yourModelDate = new Date(this.data.birthday);
		});
	}

	save() : void {
		var date = new Date(this.yourModelDate);
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		let birthday = year + '-'+ month + '-' + day;	

		this.route.params
		.switchMap((params: Params) => this.blogService.update_profile(+params['id'], this.data, birthday))
		.subscribe(data => {
			if(data > 0) {
				this._service.success('Notification', 'Updated successfully!');
			} else{
				this._service.warn('Notification', 'Error Updated!');
			}
		});
	}

	onChange(event) {
		this.files = event.srcElement.files[0];
		this.data.image = event.srcElement.files[0];
	}
}