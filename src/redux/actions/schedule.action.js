import * as UserApi from '../api/auth.api';
import commonActions from '../constants/action-types/common';
import scheduleActions from '../constants/action-types/schedule.actionTypes';

export const getPromoCode = () => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: scheduleActions.PROMOCODE,
  promise: () => UserApi.getPromoCode(),
});
export const checkPromocode = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: scheduleActions.CHECK_PROMOCDE,
  promise: () => UserApi.checkPromocode(data),
});

export const getTimeSlot = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: scheduleActions.TIMESLOT,
  promise: () => UserApi.getSlotTime(data),
});
export const getBanner = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: scheduleActions.BANNER,
  promise: () => UserApi.getBanner(data),
});
export const getTestimonial = data => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: scheduleActions.TESTIMONIAL,
  promise: () => UserApi.getTestimonial(data),
});
