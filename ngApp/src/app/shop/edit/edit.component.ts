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
	selector: 'edit-shop',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
	providers: []
})

export class ShopEditComponent implements OnInit{
	files : File;
	// user
	currentUser: User;
	check : boolean;
	items : any = {
		image : File,
	};

	list : any;

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
		this.getCategory();
	}

	record : any;
	product : any ={
		image : File,
	};
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


	getCategory() : void {
		this.shopService.getCategory().then(data => {
			if(data.result > 0){
				this.list = data.data;
				console.log(this.list)
			} else{
				this._service.warn('Notification', 'Error');
			}
		})
	}

	onChange(event) {
		this.files = event.srcElement.files[0];
		this.product.image = event.srcElement.files[0];
	}

	// save
	save(id) : void {
		this.shopService.updateProduct(id, this.product, this.currentUser.id).then(data => {
			if(data.result > 0){
				this._service.success('Notification', 'Updated successfully!');
				this.goBack();
			} else{
				this._service.warn('Notification', 'Error!')
			}
		})
	}

	// deleted
	deleted(id) : void {
		this.shopService.deletedProduct(id, this.currentUser.id).then(data => {
			if(data > 0){
				this.goBack();
			} else{
				this._service.warn('Notification', 'Error!')
			}
		})
	}

	goBack(): void {
		this.location.back();
	}
}