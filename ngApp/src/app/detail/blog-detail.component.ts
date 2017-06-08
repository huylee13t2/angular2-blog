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

declare var $:any;

@Component({
	selector: 'hero-detail',
	templateUrl: './blog-detail.component.html',
	
})
export class BlogDetailComponent implements OnInit, AfterViewInit {
	blog : Blog;
	dataTitle : any;
	dataContent : any;
	files : File;
	// user
	currentUser: User;
	check : boolean;

	user : any = { };
	list_comment : any;
	rep : any= {};
	rp : any;

	check_user_lg : boolean;

	// option notification
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

	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.blogService.getBlog(+params['id']))
		.subscribe(blog => {
			this.blog = blog;
			if(this.blog.created_by == this.currentUser.username){
				this.check = false;
			} else{
				this.check = true;
			}
		});

		this.getUser();

	}

	@ViewChild('selectElem') el:ElementRef;
	ngAfterViewInit() {
		
	}

	getUser() : void{
		this.userService.getUser(this.currentUser.username).then(data =>{
			this.user = data;
			this.getAllComment();
		});
	}


	getAllComment() : void{
		this.blogService.getAllComment(this.blog.id).then(data => {
			if(data.result > 0){
				this.list_comment = data.data;
			} else{
				this._service.warn('Notification', 'Error Comment!');
			}
			
		})
	}

	onChange(event) {
		this.files = event.srcElement.files[0];
	}

	save():void{

		// this._pushNotifications.create('Updated', {body: 'Updated successfully!'}).subscribe(
		// 	res => console.log(res),
		// 	err => console.log(err)
		// 	)

		this.blogService.updated(this.blog, this.files).then(data => {
			// this.goBack();
			if(data > 0){
				this._service.success('Notification', 'Edit successfully!');
				// this._pushNotifications.requestPermission();
				// this.router.navigateByUrl('/');
				
			} else{
				this._service.warn('Notification', 'Error');
			}
		});
	}

	delete() : void{
		this.blogService.deleted(this.blog).then(data =>{
			this._service.success('Notification', 'Deleted successfully!');
			this.goBack();
		})
	}

	goBack(): void {
		this.location.back();
	}

	comment() :void{
		this.blogService.comment(this.user.comment, this.blog.id, this.currentUser.username).then(data =>{
			if(data > 0){
				this._service.success('Notification', 'Comment successfully!');
				this.user.comment = '';
				// this._pushNotifications.requestPermission();
				// this.router.navigateByUrl('/');
				this.getAllComment();
			} else{
				this._service.warn('Notification', 'Error');
			}

		})
	}

	reply(data, id) : void{
		this.blogService.reply(data, id, this.currentUser.username).then(data =>{
			if(data > 0){
				this._service.success('Notification', 'Comment successfully!');
				this.user.comment = '';
				// this._pushNotifications.requestPermission();
				// this.router.navigateByUrl('/');
				this.getAllComment();
			} else{
				this._service.warn('Notification', 'Error');
			}
		})
		this.rp = '';
	}

	openReply(id) : void {
		var class_name = ".btn_reply"+id;
		var my_reply = ".my_reply" + id;
		$(class_name).css('color', 'red');
		var x = $(my_reply).attr('class');
		if(x.search("display_none") < 0){
			$(my_reply).addClass('display_none');
			this.rp = '';
		} else{
			this.rp = '';
			$(my_reply).removeClass('display_none');
		}
	}

	// like comment
	likeComment(id) : void {
		this.blogService.likeComment(id, this.currentUser.username).then(data =>{
			if(data>0){
				this._service.success('Notification', 'Like comment successfully!')
				this.getAllComment();
			}
		});
	}

	// liek reply
	likeReply(id) : void{
		this.blogService.likeReply(id, this.currentUser.username).then(data =>{
			if(data > 0){
				this._service.success('Notification', 'Like comment successfully!');
				this.getAllComment();
			}
		});
	}

	// delete reply of user login
	deleteReply(id) : void{
		this.blogService.deletedReply(id).then(data => {
			if(data > 0){
				this._service.success('Notification', 'Deleted successfully!');
				this.getAllComment();
			} else{
				this._service.warn('Notification', 'Error!')
			}
		})
	}

	// delete comment of user login
	deleteComment(id) : void{
		this.blogService.deletedComment(id).then(data => {
			if(data > 0){
				this._service.success('Notification', 'Deleted successfully!');
				this.getAllComment();
			} else{
				this._service.warn('Notification', 'Error!')
			}
		})
	}
}