import 'moment/locale/en-in';
import moment from 'moment';
export const shortDate = date => {
  if (moment().format('DD') == moment(date).format('DD'))
    return moment(date).format('h:mm:A');
  return moment(date).format('MMM Do YYYY');
};
export const addZeroes = value => {
  //set everything to at least two decimals; removs 3+ zero decimasl, keep non-zero decimals
  var new_value = value * 1; //removes trailing zeros
  new_value = new_value + ''; //casts it to string,

  pos = new_value.indexOf('.');
  if (pos == -1) new_value = new_value + '.00';
  else {
    var integer = new_value.substring(0, pos);
    var decimals = new_value.substring(pos + 1);
    while (decimals.length < 2) decimals = decimals + '0';
    new_value = integer + '.' + decimals;
  }
  return new_value;
};
export const getFirstLastUpperCase = (str = '') => {
  if (!str) return '';
  const arr = str.split(' ');
  const val = `${arr[0].charAt(0).toUpperCase()}${
    arr[1] ? arr[1].charAt(0).toUpperCase() : ''
  }`;
  return val;
};

export const FilterService = (CardItem, ItemList) => {
  let result = [];
  ItemList.forEach(item => {
    let data = {...item};
    CardItem.forEach(t => {
      console.log(t.item_id, item.id);
      if (t.item_id === item.id) data.quantity = t.quantity;
    });
    result.push(data);
  });
  return result;
};

export const getNextDays = (days, time) => {
  let arr = [];
  dt = new Date(time);

  for (var i = 0; i < days; i++) {
    const date = {
      date: dt.getDate(),
      day: dt.getDay(),
      time: `${dt}`,
    };

    arr.push(date);
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};
export const getFullDate = time => {
  return moment(time).format('DD MM YYYY');
};
export const getFormatDate = time => {
  return moment(time).format('YYYY-MM-DD');
};

export const onChangeDateFormate = (date = '', type = true) => {
  if (type == 'Large') return moment(date).format('LLL');
  else return moment(date).format('ll');
};

export const getTimelist = (list = [], day) => {
  const tday = moment().format('D');
  const time = `${moment().format('H')}.${moment().format('MM')}`;

  const slot = list.filter((t, idx) => {
    const Stime = t.end_time ? t.end_time.split(':') : ['00', '00'];
    if (tday != day) return t;
    else if (parseFloat(`${Stime[0]}.${Stime[1]}`) > parseFloat(time)) return t;
  });

  return slot;
};

export const isEmpty = obj => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
};
export function capitalize(input) {
  return input
    ? input
        .toLowerCase()
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
    : input;
}
