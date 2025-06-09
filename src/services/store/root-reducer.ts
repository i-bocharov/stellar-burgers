import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsProductReducer } from '@slices/ingredients-product-slice';
import { constructorProductReducer } from '@slices/constructor-product-slice';
import { userReducer } from '@slices/user-slice';

export const rootReducer = combineReducers({
  ingredientsProduct: ingredientsProductReducer,
  constructorProduct: constructorProductReducer,
  user: userReducer
});
