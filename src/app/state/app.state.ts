import {FoodCategory} from '../services/apis.service';

export interface AppState {
  food: ReadonlyArray<FoodCategory>;
}
