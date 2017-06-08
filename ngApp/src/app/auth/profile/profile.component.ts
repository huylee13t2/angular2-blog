import { Component, OnInit, EventEmitter }      from '@angular/core';
import { trigger, state, style, animate, transition } from 'angular-animate';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//notification
import { NotificationsService } from 'angular2-notifications';
import { PushNotificationsService } from 'angular2-notifications';
// account
import { User } from '../_models/index';
import { UserService } from '../_services/index';
// datepicker
import { DatePickerOptions, DateModel } from 'ng2-datepicker';


@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit{
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
		this.userService.getUser(this.currentUser.username).then(data =>{
			this.data = data;
			this.yourModelDate = new Date(this.data.birthday);
		});
	}

	save() : void{
		var date = new Date(this.yourModelDate);
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		let birthday = year + '-'+ month + '-' + day;

		this._pushNotifications.create('Updated', {body: 'Updated successfully!'}).subscribe(
			res => console.log(res),
			err => console.log(err)
			)

		this.userService.update_profile(this.data, birthday).then(data => {
			if(data > 0 ){
				this._service.success('Notification', 'Updated profile successfully!');
				// this._pushNotifications.requestPermission();
				// this.router.navigateByUrl('/');
			}else{
				this._service.warn('Notification', 'Error');
			}
		})
	}

	onChange(event) {
		this.files = event.srcElement.files[0];
		this.data.image = event.srcElement.files[0];
	}
}