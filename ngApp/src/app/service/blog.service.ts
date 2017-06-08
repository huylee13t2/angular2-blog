import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request ,RequestOptions ,RequestMethod } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';

import { Blog } from '../blog';
import { User } from '../auth/_models/index';

@Injectable()

export class BlogService{
	private headers = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
	});
	private url_http = 'http://127.0.0.1:2000/';
	private urlAllBlog = this.url_http + '/blogs/all-blogs';

	constructor(private http : Http){}

	// loginGoogle
	loginGoogle() : Promise<any>{
		const url = this.url_http + 'accounts/google/login';
		return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// add friend
	addFriend(id : number, user_id : number) : Promise<any>{
		const url = this.url_http + 'friends/add-new/';
		let fd : FormData = new FormData();
		fd.append('id_friend', id);
		fd.append('id_user', user_id);
		return this.http.post(url, fd).toPromise().then(response => response.json().result).catch(this.handleError);
	}

	// get not friend
	getAllNotFriends(id : number) : Promise<any> {
		console.log(id)
		const url = this.url_http + 'friends/add/list-not-friend/?id=' + id;
		return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// unfriend
	unfriend(id : number) : Promise<any> {
		const url = this.url_http + 'friends/unf/';
		let fd : FormData = new FormData();
		fd.append('id', id);
		return this.http.post(url, fd).toPromise().then(response => response.json().result).catch(this.handleError);
	}

	// danh sach ban be
	getAllFriends(id : number) : Promise<any> {
		const url = this.url_http + 'friends/?id=' + id;
		return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// profile
	profile(id : number) : Promise<any> {
		const url = `${this.url_http}u/profile/${id}/`;
		return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// update profile
	update_profile(id : number, data : any, birthday : string) : Promise<number> {
		const url = `${this.url_http}u/profile/${id}/updated/`;

		let fd: FormData = new FormData();
        fd.append('username', data.username);
        fd.append('fullname', data.fullname);
        fd.append('gender', data.gender);
        fd.append('birthday', birthday);
        fd.append('image', data.image);
		return this.http.post(url, fd).toPromise().then(response => response.json().result).catch(this.handleError);
	}

	// lay du lieu
	getAllBlog() : Promise<Blog[]> {
		// return Promise.resolve(BLOGS);
		const url = this.url_http + 'blogs/';
		return this.http.get(url).toPromise().then(response => response.json() as Blog[]).catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	getHeroesSlowly(): Promise<Blog[]> {
		return new Promise(resolve => {
			setTimeout(() => resolve(this.getAllBlog()), 2000);
		});
	}

	getBlog(id : number): Promise<Blog> {
		const url = `${this.url_http}blogs/${id}/`;
		return this.http.get(url).toPromise().then(response => response.json() as Blog).catch(this.handleError);
	}

	// get all comment on blog detail
	getAllComment(id : number) : Promise<any>{
		const url = this.url_http + 'blogs/comment/list/?id=' + id;
		return this.http.get(url).toPromise().then(res => res.json()).catch(this.handleError);
	}

	// deleted reply
	deletedReply(id : number) : Promise<number>{
		const url = this.url_http + 'blogs/reply/deleted/?id=' + id;
		return this.http.get(url).toPromise().then(res => res.json().result).catch(this.handleError);
	}

	// deleted comment
	deletedComment(id : number) : Promise<number>{
		const url = this.url_http + 'blogs/comment/deleted/?id=' + id;
		return this.http.get(url).toPromise().then(res => res.json().result).catch(this.handleError);
	}

	// like reply
	likeReply(id : number, user : string) : Promise<number>{
		const url = this.url_http + 'blogs/reply/like/';
		let fd : FormData = new FormData();
		fd.append('id', id);
		fd.append('user', user);
		return this.http.post(url, fd).toPromise().then(res => res.json().result).catch(this.handleError);
	}

	// like comment
	likeComment(id : number, user : string) : Promise<number> {
		const url = this.url_http + 'blogs/comment/like/';
		let fd : FormData = new FormData();
		fd.append('id', id);
		fd.append('user', user);
		return this.http.post(url, fd).toPromise().then(res => res.json().result).catch(this.handleError);
	}

	// comment blog
	comment(comment : string, id : number, user : string) : Promise<number>{
		const url = this.url_http + 'blogs/comment/';
		let fd: FormData = new FormData();
		fd.append('comment', comment);
		fd.append('id', id);
		fd.append('user', user);
		return this.http.post(url, fd).toPromise().then(res => res.json().result).catch(this.handleError);
	}

	// reply
	reply(reply : string , id : number, user : string){
		const url = this.url_http + 'blogs/reply/';
		let fd : FormData = new FormData();
		fd.append('reply', reply);
		fd.append('id', id);
		fd.append('user', user);
		return this.http.post(url, fd).toPromise().then(res => res.json().result).catch(this.handleError);
	}

	// updated rating
	updated_rating(id : number, rating : number) : Promise<number>{
		const url = this.url_http + 'blogs/updated-rating/' + id + '/';
		let fd: FormData = new FormData();
		fd.append('rating', rating);
		// return this.http.post(url, JSON.stringify({rating: rating}), {headers: this.headers}).toPromise().then(res => res.json().result);
		return this.http.post(url, fd).toPromise().then(res => res.json().result).catch(this.handleError);
	}

	// create
	create(data : any) : Promise<number>{
		let fd: FormData = new FormData();

		fd.append('image', data.image);
		fd.append('title', data.title);
		fd.append('content', data.content);

		const url = this.url_http + 'blogs/create/';
		// return this.http.post(url).toPromise().then()
		// return this.http.post(url, fd, {headers: this.headers}).toPromise().then(res => res.json() as Blog).catch(this.handleError);

		return this.http.post(url, fd).toPromise().then(res => res.json().result).catch(this.handleError);
	}

	// update blog
	updated(blog : Blog, image : File) : Promise<number>{
		let fd: FormData = new FormData();
		fd.append('image', image);
		fd.append('title', blog.title);
		fd.append('content', blog.content);
		// const url = `${this.url_http}blogs/updated/${blog.id}/`;
		const url = this.url_http + 'blogs/updated/' + blog.id + '/';
		// return this.http.post(url, fd, {headers: this.headers}).toPromise().then(() => blog).catch(this.handleError);
		return this.http.post(url, fd).toPromise().then(res => res.json().result);
	} 

	// delete blog
	deleted(blog : Blog) : Promise<number>{
		const url_delete = this.url_http + 'blogs/' + blog.id + '/';
		// return this.http.delete(url_delete).toPromise().then(res => res.json().result).catch(this.handleError);
		return this.http.delete(url_delete, {headers: this.headers}).toPromise().then(()=>null).catch(this.handleError);
	}

	// create blog
	createBlog(title : string, content : string, user : any, files : File) : Promise<Blog>{

		return new Promise((resolve, reject) =>{
			// const fd = new FormData();
			let formData: any = new FormData();
			let xhr = new XMLHttpRequest();

			formData.append('title', title);
			formData.append('content', content);
			formData.append('token', user.token);
			formData.append('file', files[0]);

			// const url_create = this.url_http + '/blog/create?title=' + title + '&content=' + content + '&token=' + user.token ;
			const url_create = this.url_http + '/blog/create' ;

			let bearer = 'Bearer ' + localStorage.getItem('currentUser');               
			xhr.open('POST', url_create, true);
			xhr.setRequestHeader('Authorization', bearer);
			xhr.send(formData);
		})



		// return this.http.post(url_create, formData, {headers : this.headers}).toPromise().then(res => res.json().data as Blog).catch(this.handleError);
	}

	private jwt() {
		// create authorization header with jwt token
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser && currentUser.token) {
			let headers = new Headers();
			headers.append( 'Authorization', 'Bearer' + currentUser.token );
			headers.append( 'aaaaaaaa', 'aaaaaaaaaaa' );

			let options =  new RequestOptions({ headers: headers });
			return options;

			// let headers = new Headers();
			// // headers.append('Content-Type', 'application/json');
			// headers.append('authentication', 'aaaaaaaaaaa');

			// let options = new RequestOptions({ headers: headers });

			// return options;
		}
	}

}