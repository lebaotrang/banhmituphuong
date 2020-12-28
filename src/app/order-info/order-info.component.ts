import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {OrderService, Order, FoodCategory} from '../services/order.service';
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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  id = this._route.snapshot.params['id'];
  created_at = null;
  info = {};
  items = [];
  constructor(
    private spinner: NgxSpinnerService, 
    private _service: OrderService, 
    private cart: CartService, 
    private modalService: NgbModal,
    private store: Store<{food: Array<FoodCategory>}>,
    private fns: AngularFireFunctions,
    private location: Location,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if(this.id!=0)
      this.getDetail();
  }

  getDetail = () => {
    // this.spinner.show('screen');
    this._service.getOrderDetail(this.id).then((data) => {
      // this.spinner.hide('screen');
      this.info = data.info;
      this.items = data.items;
      this.created_at = data.created_at;
    }).catch(err => {
      console.log(err);
    });
  }

}
