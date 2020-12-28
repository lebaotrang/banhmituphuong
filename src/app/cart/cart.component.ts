import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ApisService, Food, FoodCategory} from '../services/apis.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartService} from '../services/cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {update} from '../state/food.actions';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import distance from '@turf/distance';
import {point} from '@turf/helpers';
import * as fa from '@fortawesome/free-solid-svg-icons';
import {RecaptchaComponent} from 'ng-recaptcha';
import {AngularFireFunctions} from '@angular/fire/functions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  fa = fa;
  food$: Observable<Array<FoodCategory>> = this.store.select('food');
  foodData: FoodCategory[] = null;
  cartTotal = 0;
  cartItemCount = 0;
  order = {
    paymentType: 'cash',
    shipmentType: 'pickup',
    info: {
      name: '',
      phone: '',
      notes: '',
      address: '',
      addressCoords: {
        latitude: null,
        longitude: null
      }
    }
  }

  orgLat = 10.7828242;
  orgLng = 106.680395;
  calDistance: number|null = null;
  calDistanceText: string;
  errors = {
    name: '',
    phone: '',
    address: ''
  }
  cartItems: Array<any>;

  @ViewChild('placesRef') placesRef : GooglePlaceDirective;

  constructor(
    private spinner: NgxSpinnerService, 
    private apis: ApisService, 
    private cart: CartService, 
    private modalService: NgbModal,
    private store: Store<{food: Array<FoodCategory>}>,
    private fns: AngularFireFunctions,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.food$.subscribe((fData) => {
      if(fData && fData.length){
        this.foodData = fData;
      }
      else{
        this.apis.getMenuData().then((data) => {
          this.store.dispatch(update({data}));
        }).catch(err => {
          console.log(err);
        });
      }
    });
    this.cart.map.get(this.cart.keyInfo).subscribe((order: any) => {
      if(order){
        this.order = order;
        if(order.info.address){
          this.calAddress(order.info.address, order.info.addressCoords.latitude, order.info.addressCoords.longitude);
        }
      }
    });
  }

  cartChanged(data: {items: Array<{food: Food, amount: number, notes: string}>, itemCount: number, itemTotalPrice: number}) {
    this.cartItemCount = data.itemCount;
    this.cartTotal = data.itemTotalPrice;
    this.cartItems = data.items;
  }

  calAddress(address = '', lat = null, lng = null){
    this.calDistance = null;
    this.order.info.address = address;
    this.order.info.addressCoords.latitude = lat;
    this.order.info.addressCoords.longitude = lng;
    if(address && lat && lng){
      const fp = point([this.orgLng, this.orgLat]);
      const ft = point([lng, lat]);
      this.calDistance = Math.round(distance(fp, ft, {units: 'meters'}));
      if(this.calDistance >= 1000){
        this.calDistanceText = (this.calDistance / 1000.0).toFixed(2)+'km';
      }
      else{
        this.calDistanceText = this.calDistance + 'm';
      }
    }
  }

  handleAddressChange($event: Address) {
    if ($event && $event.geometry) {
      this.calAddress($event.formatted_address, $event.geometry.location.lat(), $event.geometry.location.lng());
    } else {
      this.calAddress();
    }
  }

  async reCaptchaResolved($event: string) {
    const callable  = this.fns.httpsCallable('createOrder');
    callable({
      ...this.order,
      info: {
        name: this.order.info.name,
        phone: this.order.info.phone,
        note: this.order.info.notes
      },
      items: this.cartItems.map(item => {
        return {
          id: item.food.id,
          name: item.food.name,
          quantity: item.amount,
          notes: item.notes,
          price: item.food.price
        }
      }),
      recaptcha: $event
    }).subscribe((rt) => {
      console.log(rt);
      this.cart.clearItem().then(() => {
        window.location.href = '/don-hang/'+rt.data;
      });      
      this.spinner.hide('screen');
    }, err => {
      console.log(err);
      this.spinner.hide('screen');
    })
  }

  reCaptchaOnError($event: []) {
    console.log($event);
    this.spinner.hide('screen');

  }

  submit(captchaRef: RecaptchaComponent) {
    let valid = true;
    this.errors = {
      name: '',
      phone: '',
      address: ''
    };
    if(this.order.info.name.trim().length === 0){
      this.errors.name = 'Vui lòng nhập họ tên';
      valid = false;
    }
    if(this.order.info.phone.trim().length === 0){
      this.errors.phone = 'Vui lòng nhập số điện thoại';
      valid = false;
    }
    else if(this.order.info.phone.trim().match(/(09|01[2|6|8|9])+([0-9]{8})/) === null){
      this.errors.phone = 'Số điện thoại không hợp lệ';
      valid = false;
    }
    if(this.order.shipmentType === 'home'){
      if(this.calDistance === null){
        this.errors.address = 'Vui lòng nhập địa chỉ giao hàng';
        valid = false;
      }
      else if(this.calDistance > 3000){
        valid = false;
      }
    }
    console.log(this.errors);
    if(valid){
      this.spinner.show('screen');
      captchaRef.execute();
    }
  }

  changeAddress() {
    this.calAddress();
  }
}
