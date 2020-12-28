import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

export interface FoodCategory {

}

export interface Order {

}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private http: HttpClient) {
    this.firestore = firestore;
  }

  public getOrderDetail(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('orders').doc(id).get().subscribe(orders => {
        resolve(orders.data());
      }, error => {
        reject(error);
      });
    });
  }

}
