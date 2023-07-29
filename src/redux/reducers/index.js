import {combineReducers,createStore} from 'redux'
import UserData from './user.reducers'
import ProductData from './product.reducers'
import ScheduleData from './schedule.reducers'
import OrderData from './order.reducers'
import LngCode from './code.reducers'
export default combineReducers({
    UserData,
    ProductData,
    ScheduleData,
    OrderData,
    LngCode 
});