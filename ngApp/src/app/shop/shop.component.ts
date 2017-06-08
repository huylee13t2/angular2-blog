import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit }      from '@angular/core';
import { trigger, state, style, animate, transition } from 'angular-animate';

import {Location} from '@angular/common';

import { Blog } from '../blog';
import { BlogService } from '../service/blog.service';
import { ShopService } from '../service/shop.service';
// account
import { User } from '../auth/_models/index';
import { UserService } from '../auth/_services/index';
//notification
import { NotificationsService } from 'angular2-notifications';
import { PushNotificationsService } from 'angular2-notifications';

@Component({
	selector: 'my-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.css'],
	providers: [],
})

export class ShopComponent implements OnInit{
	currentUser: User;
	data : any;

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
		private shopService : ShopService,
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
		this.getAllProduct();
	}

	getAllProduct() : void{
		this.shopService.getAllProduct(this.currentUser.id).then(data => {
			if(data.result > 0){
				this.data = data.data;
			} else{
				this._service.warn('Notification', 'Error Comment!');
			}
		})
	}

	loginGoogle() : void {
		this.shopService.loginGoogle()
	}
}