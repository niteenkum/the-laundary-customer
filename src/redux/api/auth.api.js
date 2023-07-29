import apiService from '../services';
import {
  login,
  logout,
  changepass,
  register,
  editprofile,
  fetchprofile,
  services,
  categoryitem,
  addnewlocation,
  updatelocation,
  addtocard,
  promocode,
  checkPromo,
  removeitemsbyservice,
  removetocard,
  saveOrderApi,
  orderlist,
  orderdetils,
  notifications,
  ratting,
  checkEmailMobile,
  sendDeviceInfo,
  cancelorder,
  driver,
  driverReviews,
  forgetpass,
  tax,
  timeslot,
  banner,
  testimonial,
  addesslist,
  prducts,
  mycart,
  otpsend,
  otpGet,
  zipcode,
  savePayments,
} from '../constants/endpoint-constants';

export const loginUserApi = data => apiService.post(`${login}`, data);
export const logoutUserApi = () => apiService.get(logout);
export const registerUserApi = data => apiService.post(register, data);
export const userProfileUpdateApi = data => apiService.post(editprofile, data);
export const fetchUserProfile = () => apiService.get(fetchprofile);
export const onChangePassword = data => apiService.post(changepass, data);
export const getNotificatons = () => apiService.get(notifications);
export const onCheckEmailNumber = data =>
  apiService.post(checkEmailMobile, data);
export const onSendDeviceInfo = data => apiService.post(sendDeviceInfo, data);
export const getdriverDetails = data => apiService.post(driver, data);
export const showRevies = data =>
  apiService.post(`${driverReviews}?user_id=${data.user_id}`, {
    page: data.page,
  });
export const onforgetpass = data => apiService.post(forgetpass, data);
export const getAddresslist = data => apiService.get(addesslist);
export const addLocation = data => apiService.post(addnewlocation, data);
export const updateLocation = data => apiService.post(updatelocation, data);
export const sendOtp = data => apiService.post(otpsend, data);
export const getOtp = data => apiService.post(otpGet, data);
export const checkZipcode = data => apiService.post(zipcode, data);

// PRODUCT
export const getservice = data => apiService.post(services, data);
export const fetchCategoryItems = data =>
  apiService.post(`${categoryitem}`, data);
export const getTax = data => apiService.get(tax);
export const removeService = data =>
  apiService.post(removeitemsbyservice, data);
export const getProducts = (data = {}) =>
  apiService.get(
    `${prducts}?page=${data.page}&search=${data.search ? data.search : ''}`,
  );
export const getcart = data => apiService.get(mycart, data);

//Schedule

export const AddToCard = data => apiService.post(addtocard, data);
export const RemoveToCard = data => apiService.post(removetocard, data);
export const getSlotTime = data => apiService.get(timeslot);
export const getBanner = data => apiService.get(banner);
export const getTestimonial = data => apiService.get(testimonial);

export const getPromoCode = () => apiService.get(promocode);
export const checkPromocode = data => apiService.post(checkPromo, data);

//Order
export const saveOrder = data => apiService.post(saveOrderApi, data);
export const getAllOrders = data =>
  apiService.get(
    `${orderlist}?type=${data.type}&currentPage=${data.currentPage}&pageSize=${data.pageSize}`,
  );
export const getOrderDetail = data => apiService.post(orderdetils, data);
export const giveOrderRatting = data => apiService.post(ratting, data);
export const onCancelOrder = data => apiService.post(cancelorder, data);
export const savePayment= data => apiService.post(savePayments, data);