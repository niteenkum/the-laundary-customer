import {Environment} from '../../../config/environment';

const {BASE_URL} = Environment;

//auth
export const login = BASE_URL + '/login';
export const logout = BASE_URL + '/logout';
export const register = BASE_URL + '/register';
export const editprofile = BASE_URL + '/editProfile';
export const fetchprofile = BASE_URL + '/userprofile';
export const changepass = BASE_URL + '/changepassword';
export const checkEmailMobile = BASE_URL + '/check_mobile_email';
export const sendDeviceInfo = BASE_URL + '/updatedevice';
export const driver = BASE_URL + '/showdrivers';
export const driverReviews = BASE_URL + '/showreviews';
export const forgetpass = BASE_URL + '/forgot';
export const addesslist = BASE_URL + '/getaddress';
export const otpsend = BASE_URL + '/verification/send_otp';
export const otpGet = BASE_URL + '/verification/verify_otp';
export const zipcode = BASE_URL + '/zipcode/check';

//Products
export const services = BASE_URL + '/getservice';
export const categoryitem = BASE_URL + '/itemList';
export const tax = BASE_URL + '/settings';
export const prducts = BASE_URL + '/products';
export const mycart = BASE_URL + '/getCart';

// shedule
export const addnewlocation = BASE_URL + '/saveAddress';
export const updatelocation = BASE_URL + '/updateAddress';
export const addtocard = BASE_URL + '/AddToCart';
export const removetocard = BASE_URL + '/RemoveFromCart';
export const promocode = BASE_URL + '/promotionList';
export const checkPromo = BASE_URL + '/checkpromocode';
export const removeitemsbyservice = BASE_URL + '/RemoveItems';
export const timeslot = BASE_URL + '/gettimeslot';
export const banner = BASE_URL + '/getbanner';
export const testimonial = BASE_URL + '/testimonial';
//order
export const saveOrderApi = BASE_URL + '/saveOrder';
export const orderlist = BASE_URL + '/userOrders';
export const orderdetils = BASE_URL + '/orderDetail';
export const notifications = BASE_URL + '/getnotification';
export const ratting = BASE_URL + '/postReview';
export const cancelorder = BASE_URL + '/cancelOrder';
export const savePayments =BASE_URL+'/savePayment'