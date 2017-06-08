import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
// notification
import { SimpleNotificationsModule } from 'angular2-notifications';
import { PushNotificationsModule } from 'angular2-notifications';

// datepicker
import { DatePickerModule } from 'ng2-datepicker';
import { DatepickerModule } from 'angular2-material-datepicker';
// import {DatePickerModule} from 'ng2-datepicker-bootstrap';
// import { MyDatePicker } from 'mydatepicker/src/my-date-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main/app.component';
import { BlogsComponent } from './home/blog.component';
import { AddBlogComponent } from './home/add/add-blog.component';
import { BlogDetailComponent } from './detail/blog-detail.component';
//profile
import { ProfileComponent } from './auth/profile/profile.component';
import { ProfilesComponent } from './profiles/profiles.component';

import { FriendsComponent } from './friends/friends.component';
import { FriendsAddComponent } from './friends/add/add.component';

// shop
import { ShopComponent } from './shop/shop.component';
import { ShopCreateComponent } from './shop/create/create.component';
import { ShopBuyComponent } from './shop/buy/buy.component';
import { ShopEditComponent } from './shop/edit/edit.component';
// auth
import { AlertComponent } from './auth/_directives/index';
import { AuthGuard } from './auth/_guards/index';
import { AlertService, AuthService, UserService } from './auth/_services/index';
// import { AlertService, UserService } from './auth/_services/index';
import { LoginComponent } from './auth/login/index';
import { RegisterComponent } from './auth/register/index';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {DropdownModule} from "ng2-dropdown";

// import { AuthService, AppGlobals } from 'angular2-google-login';
// import { Angular2SocialLoginModule } from "angular2-social-login";

// upload image
import { ImageUploadModule } from 'angular2-image-upload';
// service
import { BlogService } from './service/blog.service';
import { ShopService } from './service/shop.service';

// let providers = {
//     "google": {
//         "clientId": "960948989095-6a01r07o3klipvi51voe10kvv6ok5k3g.apps.googleusercontent.com"
//     },
//   };

@NgModule({
    declarations: [
        AppComponent,
        BlogsComponent,
        BlogDetailComponent,
        AddBlogComponent,
        // auth
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        ProfilesComponent,
        FriendsComponent,
        FriendsAddComponent,
        ShopComponent,
        ShopCreateComponent,
        ShopBuyComponent,
        ShopEditComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        StarRatingModule,
        BrowserAnimationsModule,
        PushNotificationsModule,
        SimpleNotificationsModule.forRoot(),
        DatePickerModule,
        DatepickerModule,
        AngularMultiSelectModule,
        DropdownModule,
        ImageUploadModule.forRoot(),
        // Angular2SocialLoginModule,
        // MyDatePicker,
        // datepicker
        // DatePickerModule,
    ],
    providers: [
        BlogService,
        ShopService,
        // auth
        AuthGuard,
        AlertService,
        AuthService,
        UserService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }

// Angular2SocialLoginModule.loadProvidersScripts(providers);