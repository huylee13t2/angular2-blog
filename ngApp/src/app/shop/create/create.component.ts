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

declare var $:any;

@Component({
	selector: 'create-shop',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
	providers: []
})

export class ShopCreateComponent implements OnInit, AfterViewInit{
	files : File;
	image_name : string;
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
		this.getCategory();
	}

	@ViewChild('selectElem') el:ElementRef;
	ngAfterViewInit() {
		
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
		this.items.image = event.srcElement.files[0];
	}

	create() : void{
		console.log(this.items)
		this.shopService.createNewProduct(this.items, this.currentUser.id).then(data => {
			if(data > 0) {
				this._service.success('Notification', 'Created successfully!');
			} else{
				this._service.warn('Notification', 'Error!')
			}
		})
	}

	// imageUploaded() {
	// 	console.log('==========> ahihi')
	// }

}