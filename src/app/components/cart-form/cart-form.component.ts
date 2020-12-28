import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import {ApisService, Food, FoodCategory} from '../../services/apis.service';
import {Observable} from 'rxjs';
import {CartItem, CartService} from '../../services/cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {update} from '../../state/food.actions';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss']
})
export class CartFormComponent implements OnInit, OnDestroy {
  fa = fa;
  order: Array<{
    food: Food,
    amount: number,
    notes: string
  }> = [];
  food$: Observable<Array<FoodCategory>> = this.store.select('food');
  foodData: FoodCategory[] = null;
  cartSub: any = null;
  orderTotal = 0;
  orderTotalPrice = 0;

  @Output() cartChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private cart: CartService, private modalService: NgbModal,
    private store: Store<{food: Array<FoodCategory>}>, private apis: ApisService
  ) {

  }

  ngOnInit(): void {
    this.cartSub = this.cart.map.watch(this.cart.key).subscribe((items: Array<CartItem>) => {
      this.renderCart(items);
    });
    this.food$.subscribe((fData) => {
      if(fData && fData.length){
        this.foodData = fData;
        this.cartSub = this.cart.map.get(this.cart.key).subscribe((items: Array<CartItem>) => {
          this.renderCart(items);
        });
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

  renderCart(items){
    this.order = [];
    let tt = 0;
    let pp = 0;
    if(items){
      items.forEach((item: CartItem) => {
        const food = this.getFoodData(item.id);
        if(food){
          tt += item.amount;
          pp += item.amount * food.price;
          this.order.push({
            food,
            amount: item.amount,
            notes: item.notes
          })
        }
      });
      this.orderTotal = tt;
      this.orderTotalPrice = pp;
    }
    this.cartChanged.emit({
      items: this.order,
      itemCount: tt,
      itemTotalPrice: pp
    });
  }

  private getFoodData(id): Food{
    let rs = null;
    let con = true;
    if(this.foodData){
      this.foodData.forEach((cat: FoodCategory) => {
        cat.items.forEach((food: Food) => {
          if(food.id === id){
            rs = food;
            con = false;
            return false;
          }
        });
        if(con === false){
          return false
        }
      } );
    }
    return rs;
  }

  deleteOrderItem(idx) {
    this.cart.removeItem(idx).then(() => {});
  }

  changeOrderQuantity(amount, idx) {
    this.cart.updateItem(idx, {amount}).then(() => {});
  }

  getOrderTotalPrice(){
    let rs = 0;
    if(this.order){
      this.order.forEach(item => {
        rs += item.amount * item.food.price
      });
    }
    return rs;
  }

  ngOnDestroy(): void {
    if(this.cartSub){
      this.cartSub.unsubscribe();
    }
  }

}
