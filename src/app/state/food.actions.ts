import { createAction, props } from '@ngrx/store';
import {FoodCategory} from '../services/apis.service';

export const update = createAction('[food] update', props<{ data: Array<FoodCategory> }>());
