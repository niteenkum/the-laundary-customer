import * as UserApi from '../api/auth.api';
import commonActions from '../constants/action-types/common';
import userActions from '../constants/action-types/order.actionTypes';

export const saveOrder = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.SAVEORDER,
  promise: () => UserApi.saveOrder(data),
});


export const savePayments = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.SAVEPAYMENT,
  promise: () => UserApi.savePayment(data),
});
export const getAllOrders = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes:
    data.type === 'ongoing' ? userActions.ON_GOING_ORDER : userActions.PAST,
  data,
  promise: () => UserApi.getAllOrders(data),
});
export const getOrderDetail = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.ORDER_DETAILS,
  promise: () => UserApi.getOrderDetail(data),
});

export const giveOrderRatting = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.ORDER_RATTING,
  promise: () => UserApi.giveOrderRatting(data),
});
export const cancelOrder = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.CANCEL_ORDER,
  data,
  promise: () => UserApi.onCancelOrder(data),
});
