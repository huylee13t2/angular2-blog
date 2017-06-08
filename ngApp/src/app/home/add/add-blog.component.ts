import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Location }               from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
// notification
import { NotificationsService } from 'angular2-notifications';

// import { FileUploader } from 'ng2-file-upload';

import { Blog } from '../../blog';

// service
import { BlogService } from '../../service/blog.service';

@Component({
	selector : 'add-blog',
	templateUrl : './add-blog.component.html'
})

export class AddBlogComponent implements OnInit{
	blog : Blog;
	data : any = {
		image: File,
	};
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
		private blogService : BlogService,
		private location: Location,
		private router: Router,
		private _service: NotificationsService,
	){}

	ngOnInit() : void{
		
	}

	save() : void{
		this.blogService.create(this.data).then(data => {
			console.log('this is data')
			let response = data;
			if(response > 0){
				this._service.success('Notification', 'Created successfully!');
				this.router.navigateByUrl('/');
			} else{
				this._service.warn('Notification', 'Error');
			}
		})
	}

	upload() :void{
	}

	onChange(event) {
		this.files = event.srcElement.files[0];
		this.data.image = event.srcElement.files[0];
	}

	cancel() : void{
		this.goBack();
	}

	goBack(): void {
		this.location.back();
	}
}