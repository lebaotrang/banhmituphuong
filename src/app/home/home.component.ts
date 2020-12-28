import {Component, OnInit, HostListener} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {ApisService, Food, FoodCategory} from '../services/apis.service';
import * as fa from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartItem, CartService} from '../services/cart.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {update} from '../state/food.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  food$: Observable<Array<FoodCategory>> = this.store.select('food');
  foodData: FoodCategory[] = null;
  fa = fa;
  activeCatId = '';
  orderingFood: {
    food: Food,
    amount: number,
    notes: string
  } = null;
  cartTotal = 0;
  cartItemCount = 0;

  constructor(private spinner: NgxSpinnerService, private apis: ApisService, private cart: CartService, private modalService: NgbModal,
              private store: Store<{food: Array<FoodCategory>}>
  ) {
  }

  ngOnInit(): void {
    this.food$.subscribe((fData) => {
      if(fData && fData.length){
        this.foodData = fData;
        this.activeCatId = 'cat-'+fData[0].id;
      }
      else{
        this.apis.getMenuData().then((data) => {
          this.store.dispatch(update({data}));
        }).catch(err => {
          console.log(err);
        });
      }
    })
  }

  showOrderForm(template, food: Food){
    this.orderingFood = {
      food,
      amount: 1,
      notes: ''
    };
    this.modalService.open(template, { size: 'lg' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let currentId = this.activeCatId;
    const items:HTMLCollection = document.getElementsByClassName('app-menu-item-cat');
    for(let i = 0; i<= items.length - 1; i++){
      const item = items.item(i);
      const itemTop = item.getBoundingClientRect().top;
      if(itemTop <= 0){
        currentId = item.getAttribute('id');
      }
    }
    if(currentId !== this.activeCatId){
      this.activeCatId = currentId;
    }
  }

  onChangeFoodOrdering(amount: number) {
    this.orderingFood.amount = amount;
  }

  addToCart(form) {
    this.cart.addItem({
      id: this.orderingFood.food.id,
      amount: this.orderingFood.amount,
      notes: this.orderingFood.notes
    }).then(() => {}).finally(() => {
      form.close();
    })
  }

  cartChanged(data: {items: Array<{food: Food, amount: number, notes: string}>, itemCount: number, itemTotalPrice: number}) {
    this.cartItemCount = data.itemCount;
    this.cartTotal = data.itemTotalPrice;
  }
}
