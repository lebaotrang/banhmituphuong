import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';


export interface CartItem {
  id: string;
  amount: number;
  notes: string;
}

const KEY = 'app_cart';
const KEY_INFO = 'app_cart_info';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  map: StorageMap;
  key = KEY;
  keyInfo = KEY_INFO;

  constructor(private storageMap: StorageMap) {
    this.map = storageMap;
  }

  addItem(data: CartItem): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.storageMap.get(KEY).subscribe((items: Array<CartItem>) => {
        if(!items){
          items = [];
        }
        items.push(data);
        this.storageMap.set(KEY, items).subscribe(() => {
          resolve(true)
        }, error => {reject(error)})
      }, error => {reject(error)})
    });
  }

  storeInfo(data): Promise<any> {
    console.log('store', data);
    return new Promise<any>((resolve, reject) => {
      this.storageMap.set(KEY_INFO, data).subscribe(() => {
        resolve(true)
      }, error => {reject(error)})
    });
  }

  updateItem(index, data): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.storageMap.get(KEY).subscribe((items: Array<CartItem>) => {
        if(!items){
          items = [];
        }
        items = items.map((item, idx) => {
          if(idx === index){
            return {
              ...item,
              ...data
            }
          }
          return item;
        })
        this.storageMap.set(KEY, items).subscribe(() => {
          resolve(true)
        }, error => {reject(error)})
      }, error => {reject(error)})
    })}

  removeItem(index): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.storageMap.get(KEY).subscribe((items: Array<CartItem>) => {
        if(!items){
          items = [];
        }
        items = items.filter((item, idx) => {
          return idx !== index;
        })
        this.storageMap.set(KEY, items).subscribe(() => {
          resolve(true)
        }, error => {reject(error)})
      }, error => {reject(error)})
    })}

  clearItem():  Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.storageMap.get(KEY).subscribe((items: Array<CartItem>) => {
        this.storageMap.set(KEY, []).subscribe(() => {
          resolve(true)
        }, error => {reject(error)})
      }, error => {reject(error)})
    })}
}
