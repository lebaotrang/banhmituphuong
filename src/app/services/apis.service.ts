import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

export interface FoodCategory {
  id: string;
  name: string;
  thumb?: string;
  cover?: string;
  items?: Food[]
}

export interface Food {
  id: string;
  name: string;
  thumb?: string;
  cover?: string;
  cid: string;
  desc?: string;
  price?: any
}

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  firestore: AngularFirestore;

  constructor(firestore: AngularFirestore, private http: HttpClient) {
    this.firestore = firestore;
  }

  public getMenuData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('foods', ref => ref.orderBy('sort_order', 'asc')).get().subscribe(foods => {
        this.firestore.collection('categories', ref => ref.orderBy('sort_order', 'asc')).get().subscribe(cats => {
          const foodList = foods.docs.map(food => {
            const foodData = food.data() as Food;
            return {
              ...foodData
            }
          });
          resolve(cats.docs.map(cat => {
            const catData = cat.data() as FoodCategory;
            return {
              ...catData,
              items: foodList.filter(food => {
                return food.cid === catData.id
              })
            };
          }));
        }, error => {
          reject(error);
        });
      }, error => {
        reject(error);
      });
    });
  }

}
