import scheduleActiom from '../constants/action-types/schedule.actionTypes';

export const initialState = {
  loading: false,
  fail: false,
  failRes: {},
  Promocodes: [],
  Success: false,
  promoLoading: true,
  timeSlot: [],
  dateSlot: [],
  banners: [],
  testimonial: [],
  distanceDays: 2,
};

const ScheduleData = (state = initialState, action) => {
  const {data, payload = {}, errors} = action;
  switch (action.type) {
    //Promocode
    case scheduleActiom.PROMOCODE.START:
      return {...state, loading: true};
    case scheduleActiom.PROMOCODE.SUCCESS:
      return {...state, loading: false, Promocodes: action.payload.data};
    case scheduleActiom.PROMOCODE.FAIL:
      return {...state, fail: !state.fail, loading: false};
    //check Promocode
    case scheduleActiom.CHECK_PROMOCDE.START:
      return {...state, promoLoading: true, Success: false};
    case scheduleActiom.CHECK_PROMOCDE.SUCCESS:
      return {...state, promoLoading: false, Success: action.payload};
    case scheduleActiom.CHECK_PROMOCDE.FAIL:
      return {...state, fail: !state.fail, promoLoading: false};
    //check TIMESLOT
    case scheduleActiom.TIMESLOT.START:
      return {...state, loading: true, Success: false};
    case scheduleActiom.TIMESLOT.SUCCESS:
      if (payload.status)
        return {
          ...state,
          loading: false,
          timeSlot: payload.data.time,
          dateSlot: payload.data.dates,
          distanceDays: payload.data.delivery_distance_in_days,
        };
    case scheduleActiom.TIMESLOT.FAIL:
      return {...state, fail: !state.fail, loading: false};
    default:
      return state;

    //Banner
    case scheduleActiom.BANNER.START:
      return {...state, loading: true};
    case scheduleActiom.BANNER.SUCCESS:
      console.log(action, 'action Banner////////???????????');
      return {...state, loading: false, banners: action.payload.data};
    case scheduleActiom.BANNER.FAIL:
      return {...state, fail: !state.fail, loading: false};

    //TESTIMONIAL
    case scheduleActiom.TESTIMONIAL.START:
      return {...state, loading: true};
    case scheduleActiom.TESTIMONIAL.SUCCESS:
      return {...state, loading: false, testimonial: action.payload.data};
    case scheduleActiom.TESTIMONIAL.FAIL:
      return {...state, fail: !state.fail, loading: false};
  }
};

export default ScheduleData;
