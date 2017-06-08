import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request ,RequestOptions ,RequestMethod } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';

import { Blog } from '../blog';
import { User } from '../auth/_models/index';

@Injectable()

export class ShopService{
	private headers = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
	});
	private url_http = 'http://127.0.0.1:2000/';

	constructor(private http : Http){}

	// loginGoogle
	loginGoogle() : Promise<any>{
		const url = this.url_http + 'accounts/google/login/';
		return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// deleted product
	deletedProduct(id : number, user : number) : Promise<number> {
		const url = `${this.url_http}shop/product/${id}/deleted/`;
		let fd : FormData = new FormData();
		fd.append('user', user);
		return this.http.post(url, fd).toPromise().then(response => response.json().result).catch(this.handleError);
	}

	// update product
	updateProduct(id : number, data : any, user_id : number) : Promise<any>{
		console.log(data)
		const url = `${this.url_http}shop/product/${id}/updated/`;
		console.log(url)
		let fd : FormData = new  FormData();
		fd.append('id', id);
		fd.append('title', data.title);
		fd.append('total', data.total);
		fd.append('price', data.price);
		fd.append('category', data.category);
		fd.append('image', data.image);
		fd.append('user_id', user_id);
		return this.http.post(url, fd).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// buy product
	buyProduct(id : number, record : number, user_id : number) : Promise<any> {
		const url = this.url_http + 'shop/buy/';
		let fd : FormData = new FormData();
		fd.append('user_id', user_id);
		fd.append('id', id);
		fd.append('record', record);
		return this.http.post(url, fd).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// get product
	getProduct(id : number) : Promise<any> {
		// const url = this.url_http + 'shop/product/buy/?id=' + id;
		const url = `${this.url_http}shop/product/${id}/`;
		console.log(url)
		return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// all product
	getAllProduct(id : number) : Promise<any> {
		const url = this.url_http + 'shop/product/';
		let fd : FormData = new FormData();
		fd.append('id' , id);
		return this.http.post(url, fd).toPromise().then(response => response.json()).catch(this.handleError);
	} 

	// get category
	getCategory() : Promise<any> {
		const url = this.url_http + 'shop/list-category/';
		console.log(url)
		return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
	}

	// create new product
	createNewProduct(data : any, id : number) : Promise<number> {
		const url = this.url_http + 'shop/product/create/';
		let fd : FormData = new FormData();
		fd.append('title', data.title);
		fd.append('price', data.price);
		fd.append('total', data.total);
		fd.append('category', data.category);
		fd.append('image', data.image);
		fd.append('id', id);
		return this.http.post(url, fd).toPromise().then(response => response.json().result).catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
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
		}
	}

}