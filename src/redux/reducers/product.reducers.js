import productAction from '../constants/action-types/product.actionTypes';
import {setAsyncStorage} from '../../utils/asyncStorage';
import {STORAGES} from '../../res/ConstVariable';
const KEY = ['minus', 'pulse', 'delete'];
export const initialState = {
  ServieData: false,
  ProductList: [],
  productLastPage: 1,
  CardItem: [],
  CardLoading: false,
  TotalAmount: 0,
  CategoryList: [],
  Sevices: [],
  zipdata: {},
  Categoryloading: false,
  ItemList: [],
  ItemLoading: false,
  success: false,
  loading: false,
  success2: false,
  loading2: false,
  service_area: [],
  CartData: {},
  fail: false,
  fail2: false,
};

const ProductData = (state = initialState, action) => {
  const {payload, data, errors} = action;
  let ProductList = [...state.ProductList];
  let ItemList = [...state.ItemList];

  let TotalAmount = state.TotalAmount;

  console.log({payload, service_area: payload?.service_area});

  const {items = [], products = []} = state.CartData;
  switch (action.type) {
    //product  List
    case productAction.PRODUCTS.START:
      if (data.page <= 1) return {...state, loading2: true, ProductList: []};
      else return {...state, loading2: true};
    case productAction.PRODUCTS.SUCCESS:
      return {
        ...state,
        loading2: false,
        ProductList: [...ProductList, ...payload.data.data],
        productLastPage: payload.data.last_page,
      };

    case productAction.PRODUCTS.FAIL:
      return {...state, fail: errors, loading2: false};
    //CART DATA List
    case productAction.MY_CART.START:
      return {...state, loading2: true, CartData: {}, fail: false};
    case productAction.MY_CART.SUCCESS:
      return {
        ...state,
        loading2: false,
        CartData: payload,
        TotalAmount: payload.total_amount,
      };
    case productAction.MY_CART.FAIL:
      return {...state, fail: errors, loading2: false};

    //Service Data
    case productAction.ADDTOCARD.START:
      return {...state, CardLoading: true, CardItem: {}, success: false};

    case productAction.ADDTOCARD.SUCCESS:
      if (data.type == KEY[2]) {
        TotalAmount = TotalAmount - data.amount;
        let CartData = {...state.CartData};
        if (data.model_type === 'Product') {
          products.map((t, idx) => {
            if (t.model_id === data.model_id) products.splice(idx, 1);
          });
        } else if (data.model_type === 'Item') {
          items.map((t, idx) => {
            if (t.model_id === data.model_id) items.splice(idx, 1);
          });
        }
        return {
          ...state,
          CardLoading: false,
          CartData: {products, ...CartData},
          TotalAmount,
        };
      } else {
        if (data.type == KEY[0]) TotalAmount = TotalAmount - data.amount;
        if (data.type == KEY[1]) TotalAmount = TotalAmount + data.amount;
        if (data.model_type === 'Product') {
          ProductList.map((t, idx) => {
            if (t.id === data.model_id)
              ProductList[idx] = {...t, quantity: data.quantity};
          });
          return {
            ...state,
            CardLoading: false,
            ProductList,
            success: payload,
            TotalAmount,
          };
        } else if (data.model_type === 'Item') {
          ItemList.map((t, idx) => {
            if (t.item_id === data.model_id)
              ItemList[idx] = {...t, quantity: data.quantity};
          });
          return {
            ...state,
            CardLoading: false,
            ItemList,
            success: payload,
            TotalAmount,
          };
        } else return {...state, CardLoading: false, success: payload};
      }
    case productAction.ADDTOCARD.FAIL: {
      const data = {...state.ServieData, ...action.data};
      setAsyncStorage(STORAGES.ADDTOCART, JSON.stringify(data));
      return {...state, fail: !state.fail, CardLoading: false};
    }

    case productAction.REMOVESERVICE: {
      let ServieData = {...state.ServieData};
      delete ServieData[action.data.id];
      // console.log(
      //   JSON.stringify(payload.data),
      //   'payload.dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaoooooooooooooooooooooo',
      // );
      return {...state, ServieData};
    }

    //SERVICE LIST
    case productAction.SEVICES.START:
      return {...state, loading2: true, fail2: false, Sevices: []};
    case productAction.SEVICES.SUCCESS:
      console.log(
        JSON.stringify(payload.data),
        'payload.dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaoooooooooooooooooooooo',
      );
      return {
        ...state,
        loading2: false,
        service_area: payload.service_area ? payload.service_area : {},
        Sevices: payload.data ? payload.data : [],
        fail2: payload.errors ? payload.errors : false,
      };
    case productAction.SEVICES.FAIL:
      // console.log(
      //   errors,
      //   'payload.dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaoooooooooooooooooooooo',
      // );
      return {...state, fail2: errors, loading2: false};
    // Remove Cart by service
    case productAction.REMOVE_CARD_BY_SERVICE.START:
      return {...state, loading: true};
    case productAction.REMOVE_CARD_BY_SERVICE.SUCCESS:
      let ServieData = {...state.ServieData};
      delete ServieData[action.data.service_id];
      return {...state, ServieData, loading: false};

    case productAction.REMOVE_CARD_BY_SERVICE.FAIL:
      return {...state, fail: !state.fail, loading: false};
    //Category item
    case productAction.CATEGORY_ITEM.START:
      return {...state, ItemLoading: true, ItemList: []};
    case productAction.CATEGORY_ITEM.SUCCESS:
      return {...state, ItemLoading: false, ItemList: action.payload.data};
    case productAction.CATEGORY_ITEM.FAIL:
      return {...state, fail: !state.fail, ItemLoading: false};
    //GET_TAX item
    case productAction.GET_TAX.START:
      return {...state, loading2: true};
    case productAction.GET_TAX.SUCCESS:
      return {...state, loading2: false, success2: action.payload.data};
    case productAction.GET_TAX.FAIL:
      return {...state, fail: !state.fail, loading2: false};

    default:
      return state;
  }
};

export default ProductData;

/*

    // case productAction.ADDTOCARD.START:
    // return { ...state, CardLoading: true,CardItem:[] };
    // case productAction.ADDTOCARD.SUCCESS:
    // //  let data=[]
    // //  if(action.payload.data)
    // //     data =FilterService(action.payload.data)
 
    //  const ItemList=FilterService(state.CardItem,[...action.payload.data])
    //  return { ...state,ItemList,CardItem: action.payload.data};

    //return { ...state, CardLoading: false, CardItem: action.payload.data};
      } */
