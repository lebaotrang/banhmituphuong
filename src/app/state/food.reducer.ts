import { createReducer, on } from '@ngrx/store';
import { update } from './food.actions';
import {FoodCategory} from '../services/apis.service';

export const initialState: Array<FoodCategory> = [];

const _foodReducer = createReducer(
  initialState,
  on(update, (state, {data}) => {
    return [...data]
  }),
);

export function foodReducer(state, action) {
  return _foodReducer(state, action);
}
