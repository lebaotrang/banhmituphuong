import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import {CartItem, CartService} from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  fa = fa;

  cartTotal = 0;
  cartSub = null;

  constructor(private cart: CartService) {

  }

  ngOnInit(): void {
    this.cartSub = this.cart.map.watch(this.cart.key).subscribe((items: Array<CartItem>) => {
      let rs = 0;
      if(items && items.length){
        items.forEach(item => {
          rs += item.amount;
        });
      }
      this.cartTotal = rs;
    });
  }

  ngOnDestroy(): void {
    if(this.cartSub){
      this.cartSub.unsubscribe();
    }
  }

}
