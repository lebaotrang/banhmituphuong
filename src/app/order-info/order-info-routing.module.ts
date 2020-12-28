import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderInfoComponent} from './order-info.component';


const routes: Routes = [
  {
    path: '',
    component: OrderInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderInfoRoutingModule { }
