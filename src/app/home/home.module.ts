import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {CartWidgetModule} from '../shared/cart-widget/cart-widget.module';
import {NgxStickySidebarModule} from '@smip/ngx-sticky-sidebar';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CartWidgetModule,
    HomeRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    ScrollToModule.forRoot(),
    NgxStickySidebarModule,
  ]
})
export class HomeModule { }
