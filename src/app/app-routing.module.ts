import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m=>m.HomeModule) },
  { path: 'gio-hang', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'don-hang/:id', loadChildren: () => import('./order-info/order-info.module').then(m => m.OrderInfoModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
