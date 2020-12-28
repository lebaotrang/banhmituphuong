import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartFormComponent} from '../../components/cart-form/cart-form.component';
import {QuantityComponent} from '../../components/quantity/quantity.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CartFormComponent,
    QuantityComponent
  ],
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
  exports: [
    CartFormComponent,
    QuantityComponent
  ]
})
export class CartWidgetModule { }
