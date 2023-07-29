import * as UserApi from '../api/auth.api';
import commonActions from '../constants/action-types/common';
import productActions from '../constants/action-types/product.actionTypes';
const TYPE = ['Minus', 'Palse'];

export const getservice = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: productActions.SEVICES,
  data,
  promise: () => UserApi.getservice(data),
});

export const fetchCategoryItems = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: productActions.CATEGORY_ITEM,
  data,
  promise: () => UserApi.fetchCategoryItems(data),
});
export const setTotelAmont = data => ({
  type: productActions.TOTEL_AMMONT,
  data,
});

export const getCard = data => ({
  subtypes: productActions.MY_CART,
  type: commonActions.COMMON_API_CALL,
  promise: () => UserApi.getcart(data),
  data: data,
});

export const addBuyItem = data => ({
  subtypes: productActions.ADDTOCARD,
  type: commonActions.COMMON_API_CALL,
  promise: () => UserApi.AddToCard(data.payload),
  data: data,
});
export const removeBuyItem = data => ({
  subtypes: productActions.ADDTOCARD,
  type: commonActions.COMMON_API_CALL,
  data: {},
});

export const removeService = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: productActions.REMOVE_CARD_BY_SERVICE,
  data,
  promise: () => UserApi.removeService(data),
});

export const getTaxValue = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: productActions.GET_TAX,
  data,
  promise: () => UserApi.getTax(data),
});

//===
export const getProducts = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: productActions.PRODUCTS,
  data,
  promise: () => UserApi.getProducts(data ? data : {}),
});
