import * as UserApi from "../api/auth.api";
import commonActions from "../constants/action-types/common";
import userActions from "../constants/action-types/login.actionTypes";
 
//getOtp,
export const verifyOtp =(data)=>({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.GET_OTP,
  promise: () => UserApi.getOtp(data)
})
export const sendOtp =(data)=>({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.SEND_OTP,
  promise: () => UserApi.sendOtp(data)
})
export const getOtp =(data)=>({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.GET_OTP,
  promise: () => UserApi.sendOtp(data)
})
export const loginUser = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.LOGIN,
  promise: () => UserApi.loginUserApi(data)
});
export const logoutUser = () => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.LOGOUT,
  promise: () => UserApi.logoutUserApi()
});
export const addLocation = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.ADD_LOCATION,
   promise: () => UserApi.addLocation(data)
});
export const updateLocation = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.ADD_LOCATION,
  data,
  promise: () => UserApi.updateLocation(data)
});
export const onChangePassword = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.LOGIN,
  promise: () => UserApi.onChangePassword(data)
});

export const registerUser = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.LOGIN,
  data,
  promise: () => UserApi.registerUserApi(data)
});

export const getAddressList = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.ADDRESS_LIST,
  promise: () => UserApi.getAddresslist()
});
export const selectedAddress = data => ({
  type: userActions.SERLECTED_ADDRESS,
  data
});

export const editUserProfile = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.PROFILE,
  data,
  promise: () => UserApi.userProfileUpdateApi(data)
});
export const fetchUserProfile = () => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.FETCH_PROFILE,
  promise: () => UserApi.fetchUserProfile()
});
export const setUserProfile = (data) => ({
  type:userActions.SET_PROFILE, 
  data
 });

export const getNotificatons = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.NOTIFICATION,
  promise: () => UserApi.getNotificatons()
});
export const checkEmailNumber = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.CHECK_EMAIL_NUMBER,
  promise: () => UserApi.onCheckEmailNumber(data)
});
export const onStoreDeviceInfo = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.DEVICE_INFO,
  promise: () => UserApi.onSendDeviceInfo(data)
});

export const getDriverDetais = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.DRIVER_DETAILS,
  promise: () => UserApi.getdriverDetails(data)
});
export const showRevies = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.DRIVER_REVIEWS,
  promise: () => UserApi.showRevies(data)
});
export const forgetpass = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.FORGET_PASS,
  promise: () => UserApi.onforgetpass(data)
});

export const changeCode = (data) => ({
  type:  userActions.CHANGE_CODE,
  data
});

export const checkZipcode = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: userActions.CHECK_ZIPCODE,
  promise: () => UserApi.checkZipcode(data)
});
 