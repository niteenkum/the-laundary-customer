import authAction from "../constants/action-types/login.actionTypes";
import {LngCode11} from '../../res/code'
export const initialState = LngCode11['ITALY'];

const LngCode = (state = initialState, action) => {
 const {payload,data,errors} =action
  
 switch (action.type) {
    case  authAction.CHANGE_CODE :
    return { ...LngCode11[data]}
    default:
      return state;
  }
};

export default LngCode;
