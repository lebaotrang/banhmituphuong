import {Component, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as fa from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {

  @Input() quantity: number;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() deleteButton: boolean;

  fa = fa;

  constructor() {
    this.quantity = 1;
    this.deleteButton = false;
  }

  ajd(amount) {
    this.quantity += amount;
    if(this.quantity <= 0){
      this.quantity = 1;
    }
    this.onChange.emit(this.quantity);
  }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit();
  }
}
