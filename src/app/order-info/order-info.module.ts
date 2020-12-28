import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderInfoComponent} from './order-info.component';
import {OrderInfoRoutingModule} from './order-info-routing.module';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [OrderInfoComponent],
  imports: [
    CommonModule,
    OrderInfoRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule
  ]
})
export class OrderInfoModule { }
