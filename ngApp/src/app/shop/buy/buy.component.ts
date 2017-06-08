import 'rxjs/add/operator/switchMap';
import { Component, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit }      from '@angular/core';
import { trigger, state, style, animate, transition } from 'angular-animate';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//notification
import { NotificationsService } from 'angular2-notifications';
import { PushNotificationsService } from 'angular2-notifications';

import { ShopService } from '../../service/shop.service';
// account
import { User } from '../../auth/_models/index';
import { UserService } from '../../auth/_services/index';

@Component({
	selector: 'buy-shop',
	templateUrl: './buy.component.html',
	styleUrls: ['./buy.component.css'],
	providers: []
})

export class ShopBuyComponent implements OnInit{
	// user
	currentUser: User;

	// product
	product : any = {};

	record : number;

	check : boolean;

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
		private shopService: ShopService,
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
		this.getProduct();
	}

	getProduct() :void{
		this.route.params
		.switchMap((params: Params) => this.shopService.getProduct(+params['id']))
		.subscribe(data => {
			if(data.result > 0){
				this.record = 1;
				this.product = data.data;
				if(data.data.user_id == this.currentUser.id){
					this.check = false;
				} else{
					this.check = true;
				}
			} else{
				this._service.warn('Notification', 'Error!')
			}
		});
	}

	// buy
	buy(id) : void{
		this.shopService.buyProduct(id, this.record, this.currentUser.id).then(data => {
			if(data.result > 0){
				this._service.success('Notification', 'Buy successfully!');
				this.getProduct();
			} else if(data.result == 0) {
				this._service.warn('Notification', data.msg);
			} else{
				this._service.warn('Notification', 'Error!')
			}
		})
	}

	goBack(): void {
		this.location.back();
	}
}