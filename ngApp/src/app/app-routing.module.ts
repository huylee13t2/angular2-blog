import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// home
import { BlogsComponent } from './home/blog.component';
import { AddBlogComponent } from './home/add/add-blog.component';
// friends
import { FriendsComponent } from './friends/friends.component';
import { FriendsAddComponent } from './friends/add/add.component';
// detail
import { BlogDetailComponent } from './detail/blog-detail.component';
// auth
import { LoginComponent } from './auth/login/index';
import { RegisterComponent } from './auth/register/index';
import { AuthGuard } from './auth/_guards/index';
//profile
import { ProfileComponent } from './auth/profile/profile.component';
import { ProfilesComponent } from './profiles/profiles.component';
// shop
import { ShopComponent } from './shop/shop.component';
import { ShopCreateComponent } from './shop/create/create.component';
import { ShopBuyComponent } from './shop/buy/buy.component';
import { ShopEditComponent } from './shop/edit/edit.component';

const routes: Routes = [
	{ 
		path: 'login', component: 
		LoginComponent 
	},
    { 
    	path: 'register', 
    	component: RegisterComponent
    },
    {
        path: 'home',
        component: BlogsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'profiles/:id',
        component: ProfilesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'blogs/create',
        component: AddBlogComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'blogs/:id',
        component: BlogDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-friend',
        component: FriendsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-friend/add',
        component: FriendsAddComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-shop',
        component: ShopComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-shop/create',
        component: ShopCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-shop/buy/:id',
        component: ShopBuyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-shop/edit/:id',
        component: ShopEditComponent,
        canActivate: [AuthGuard]
    },
    
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
