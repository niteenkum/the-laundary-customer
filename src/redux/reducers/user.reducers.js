import authAction from '../constants/action-types/login.actionTypes';
import {setAsyncStorage} from '../../utils/asyncStorage';
import {STORAGES} from '../../res/ConstVariable';
import apiService from '../services';

export const initialState = {
  loading: false,
  success: false,
  fail: false,
  MyAddress: {},
  CheckEmailSuccess: false,
  CheckEmailfail: false,
  Driver: {},
  profileloading: false,
  profileSuccess: false,
  Notifications: [],
  NotiLoader: false,

  AddressList: [],
  reviewLastPage: 1,
  reviewLoading: false,
  DriverReviews: [],
  User: {},
  CheckZipcode: false,
  loading2: false,
  otpdata: false,
  failOtp: false,
};

const UserData = (state = initialState, action) => {
  console.log('User Reducer', action);
  const {data = {}, payload = {}, errors = {}} = action;
  switch (action.type) {
    // Selected Address
    case authAction.SERLECTED_ADDRESS:
      return {...state, MyAddress: data};
    // Update Profile
    case authAction.SET_PROFILE:
      return {...state, User: action.data};
    // LOGOUT
    case authAction.LOGOUT.START:
      apiService.removeToken();
      return {...state, User: {}};
    //get OTP
    case authAction.GET_OTP.START:
    
      return {...state, loading2: true, otpdata: false, failOtp: false};
    case authAction.GET_OTP.SUCCESS:
      console.log(payload, 'payloadddddd...................?????????????????');
      if (payload.status)
        return {
          ...state,
          loading2: false,
          otpdata: payload,
          User:
            state.CheckEmailSuccess && state.CheckEmailSuccess.data
              ? state.CheckEmailSuccess.data
              : {},
        };
      else return {...state, loading2: false, otpdata: action.payload};
    case authAction.GET_OTP.FAIL:
      return {...state, failOtp: errors, loading2: false};
    //Send OTP
    case authAction.SEND_OTP.START:
      return {...state, loading2: true, otpdata: false, failOtp: false};
    case authAction.SEND_OTP.SUCCESS:
      return {...state, loading2: false, otpdata: action.payload};
    case authAction.SEND_OTP.FAIL:
      return {...state, failOtp: errors, loading2: false};

    //Send DviceInfo
    case authAction.DEVICE_INFO.START:
      return {...state, loading: true};
    case authAction.DEVICE_INFO.SUCCESS:
      return {...state, loading: false, success: payload};
    case authAction.DEVICE_INFO.FAIL:
      return {...state, fail: !state.fail, loading: false};

    //CheckEmailLogin
    case authAction.CHECK_EMAIL_NUMBER.START:
      return {
        ...state,
        loading: true,
        CheckEmailSuccess: false,
        CheckEmailfail: false,
      };
    case authAction.CHECK_EMAIL_NUMBER.SUCCESS:
      return {...state, loading: false, CheckEmailSuccess: action.payload};
    case authAction.CHECK_EMAIL_NUMBER.FAIL:
      return {...state, CheckEmailfail: errors, loading: false};
    //LOGIN
    case authAction.LOGIN.START:
      return {...state, loading: true, CheckEmailSuccess: false, fail: false};
    case authAction.LOGIN.SUCCESS:
      console.log(payload, ' payload.status,,,,,,,,,,,,');
      return {
        ...state,
        loading: false,
        success: payload,
        User: payload.status ? payload.data : {},
      };
    case authAction.LOGIN.FAIL:
      return {...state, fail: errors.response, loading: false};
    //USER PROFILE
    case authAction.FETCH_PROFILE.START:
      return {...state, profileloading: true};
    case authAction.FETCH_PROFILE.SUCCESS:
      if (action.payload.status && action.payload.status === 'true')
        setAsyncStorage(STORAGES.USER, JSON.stringify(action.payload.data));
      return {...state, profileloading: false, User: action.payload.data};

    case authAction.FETCH_PROFILE.FAIL:
      return {...state, fail: !state.fail, profileloading: false};
    //PROFILE UPLOAD
    case authAction.PROFILE.START:
      return {...state, profileloading: true};
    case authAction.PROFILE.SUCCESS:
      return {...state, profileloading: false, profileSuccess: action.payload};
    case authAction.PROFILE.FAIL:
      return {...state, fail: !state.fail, profileloading: false};
    //NOTIFICATION
    case authAction.NOTIFICATION.START:
      return {...state, NotiLoader: true};
    case authAction.NOTIFICATION.SUCCESS:
      return {...state, NotiLoader: false, Notifications: action.payload.data};
    case authAction.NOTIFICATION.FAIL:
      return {...state, fail: !state.fail, NotiLoader: false};
    //ADDRESS_LIST
    case authAction.ADDRESS_LIST.START:
      return {...state, loading: true};
    case authAction.ADDRESS_LIST.SUCCESS:
      return {...state, loading: false, AddressList: action.payload.data};
    case authAction.ADDRESS_LIST.FAIL:
      return {...state, fail: !state.fail, loading: false};

    //Location
    case authAction.ADD_LOCATION.START:
      return {...state, loading: true};
    case authAction.ADD_LOCATION.SUCCESS:
      if (payload.status) state.AddressList.push(action.payload.data);
      return {...state, loading: false, MyAddress: action.payload.data};
    case authAction.ADD_LOCATION.FAIL:
      return {
        ...state,
        fail: !state.fail,
        loading: false,
      };
    //Driver DEtils
    case authAction.DRIVER_DETAILS.START:
      return {...state, loading: true};
    case authAction.DRIVER_DETAILS.SUCCESS:
      return {...state, loading: false, Driver: action.payload.data};
    case authAction.DRIVER_DETAILS.FAIL:
      return {...state, fail: !state.fail, loading: false};
    //FORGET PASSWORD
    case authAction.FORGET_PASS.START:
      return {...state, loading: true};
    case authAction.FORGET_PASS.SUCCESS:
      return {...state, loading: false, success: action.payload};
    case authAction.FORGET_PASS.FAIL:
      return {...state, fail: !state.fail, loading: false};
    //CHECK ZIPCODE
    case authAction.CHECK_ZIPCODE.START:
      return {...state, loading: true};
    case authAction.CHECK_ZIPCODE.SUCCESS:
      return {...state, loading: false, CheckZipcode: action.payload};
    case authAction.CHECK_ZIPCODE.FAIL:
      return {...state, fail: !state.fail, loading: false};
    //Driver Revies
    case authAction.DRIVER_REVIEWS.START:
      if (data.first) return {...state, reviewLoading: true, DriverReviews: []};
      else state;
    case authAction.DRIVER_REVIEWS.SUCCESS:
      if (payload.status) {
        if (!data.first && data.page <= payload.last_page)
          return {
            ...state,
            DriverReviews: [...state.DriverReviews, ...action.payload.data],
            reviewLoading: false,
          };
        else
          return {
            ...state,
            DriverReviews: payload.data,
            reviewLastPage: payload.last_page,
            reviewLoading: false,
          };
      } else return {...state, reviewLoading: false};
    case authAction.DRIVER_REVIEWS.FAIL:
      return {...state, fail: !state.fail, reviewLoading: false};
    default:
      return state;
  }
};

export default UserData;
