import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Location} from '@angular/common';

import { Blog } from '../blog';
import { BlogService } from '../service/blog.service';
// account
import { User } from '../auth/_models/index';
import { UserService } from '../auth/_services/index';
// rating
import {IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent} from "angular-star-rating/src/star-rating-struct";

@Component({
	selector: 'my-blogs',
	templateUrl: './blog.component.html',
	providers: []
})

export class BlogsComponent implements OnInit{
	blogs : Blog[];

	data : Blog;

	// user
	currentUser: User;

	// rating
	onClickResult:IStarRatingOnClickEvent;
    onHoverRatingChangeResult:IStarRatingIOnHoverRatingChangeEvent;
    onRatingChangeResult:IStarRatingOnRatingChangeEven;

	constructor(
		private blogService : BlogService,
		private router: Router,
		// public modal: Modal,
		private location: Location,

		// user
		private userService: UserService
	){
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}


	ngOnInit() : void{
		this.getAllBlog();
	}

	getAllBlog(): void {
		this.blogService.getAllBlog().then(blogs => {
			this.blogs = blogs;
		});

	}

	// rating
    onClick = ($event:IStarRatingOnClickEvent, id) => {
        this.onClickResult = $event;
        // save rating
        this.blogService.updated_rating(id, $event.rating).then(data => {
        	if(data > 0){
        		this.router.navigateByUrl('/');
        	}
        });
    };
 
    onRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
        this.onRatingChangeResult = $event;
    };
 
    onHoverRatingChange = ($event:IStarRatingIOnHoverRatingChangeEvent) => {
        this.onHoverRatingChangeResult = $event;
    };
	
}
