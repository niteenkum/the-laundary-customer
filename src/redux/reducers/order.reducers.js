import authAction from '../constants/action-types/order.actionTypes';

export const initialState = {
  loading: false,
  loading2: false,
  OnGoing: [],
  Past: [],
  ongoingTotalPage: 0,
  pastTotalPages: 0,
  OrderDetials: {},
  Products: [],
  Items: [],
  OrderDetialsLoader: false,
  success: false,
  Ratting: false,
  fail: false,
  failMsg: {},
  success2: false,
  orderCancelloading: false,
  cancelFails: false,
};

const OrderData = (state = initialState, action) => {
  const {payload, data, errors} = action;
  switch (action.type) {
    //ORDER Ratting
    case authAction.ORDER_RATTING.START:
      return {...state, loading: true};

    case authAction.ORDER_RATTING.SUCCESS:
      console.log(action.payload, 'action.payloaddddddddd.......;lkijui');
      return {...state, loading: false, Ratting: action.payload};
    case authAction.ORDER_RATTING.FAIL:
      return {...state, fail: !state.fail, loading: false};
    //ORDER CANCEL
    case authAction.CANCEL_ORDER.START:
      return {...state, orderCancelloading: true, success2: false};
    case authAction.CANCEL_ORDER.SUCCESS:
      if (payload.status)
        state.OnGoing.filter((t, idx) => {
          if (t.id === data.order_id) state.OnGoing.splice(idx, 1);
        });
      return {...state, orderCancelloading: false, success2: action.payload};
    case authAction.CANCEL_ORDER.FAIL:
      return {
        ...state,
        cancelFails: !state.cancelFails,
        orderCancelloading: false,
      };
//savepayment
case authAction.SAVEPAYMENT.START:
  return {...state, loading: true};
case authAction.SAVEPAYMENT.SUCCESS:
  return {...state, loading: false, success: action.payload.data};
case authAction.SAVEPAYMENT.FAIL:
  return {
    ...state,
    fail: !state.fail,
    failMsg: action.payload,
    loading: false,
  };

    //SAVE ORDER
    case authAction.SAVEORDER.START:
      return {...state, loading: true};
    case authAction.SAVEORDER.SUCCESS:
      return {...state, loading: false, success: action.payload.data};
    case authAction.SAVEORDER.FAIL:
      return {
        ...state,
        fail: !state.fail,
        failMsg: action.payload,
        loading: false,
      };

    //SAVE ORDER
    case authAction.ON_GOING_ORDER.START:
      if (data.first)
        return {...state, OnGoing: [], fail: false, loading: true};
      else return {...state, loading: true, fail: false};
    case authAction.ON_GOING_ORDER.SUCCESS:
      if (data.type === 'ongoing') {
        if (data.first)
          return {
            ...state,
            loading: false,
            ongoingTotalPage: action.payload.total,
            OnGoing: action.payload.data.data,
          };
        else
          return {
            ...state,
            loading: false,
            OnGoing: state.OnGoing.concat(payload.data.data),
          };
      }
    case authAction.ON_GOING_ORDER.FAIL:
      return {...state, fail: errors, fail: errors.response, loading: false};

    //SAVE ORDER
    case authAction.PAST.START:
      if (data.first) return {...state, Past: [], fail: false, loading2: true};
      else return {...state, loading2: true, fail: false};
    case authAction.PAST.SUCCESS:
      if (data.type === 'past') {
        if (data.first)
          return {
            ...state,
            loading2: false,
            ongoingTotalPage: action.payload.total,
            Past: action.payload.data.data,
          };
        else
          return {
            ...state,
            loading2: false,
            Past: state.Past.concat(payload.data.data),
          };
      }
    case authAction.PAST.FAIL:
      return {...state, fail: errors, fail: errors.response, loading2: false};
    // order Detaill
    case authAction.ORDER_DETAILS.START:
      return {...state, OrderDetialsLoader: true, Items: [], Products: []};
    case authAction.ORDER_DETAILS.SUCCESS:
      return {
        ...state,
        OrderDetialsLoader: false,
        OrderDetials: payload.data,
        Products: payload.products,
        Items: payload.items,
      };
    case authAction.ORDER_DETAILS.FAIL:
      return {...state, fail: !state.fail, OrderDetialsLoader: false};

    default:
      return state;
  }
};

export default OrderData;
