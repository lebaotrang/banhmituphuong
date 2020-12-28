import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from './cart.component';
import {CartRoutingModule} from './cart-routing.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {RecaptchaModule} from 'ng-recaptcha';
import {CartWidgetModule} from '../shared/cart-widget/cart-widget.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartWidgetModule,
    CartRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    FontAwesomeModule,
    GooglePlaceModule,
    RecaptchaModule,
    NgxSkeletonLoaderModule
  ]
})
export class CartModule { }
