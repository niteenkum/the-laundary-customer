import * as React from 'react';
import { SvgCss } from 'react-native-svg';
import { colors } from '../appStyles';

const xml = `- <svg version="1.1" id="Capa_1" 
xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
  <path  style="fill:${colors.tint};" d="M353.188,252.052c-23.51,0-46.594-3.677-68.469-10.906c-10.719-3.656-23.896-0.302-30.438,6.417l-43.177,32.594
       c-50.073-26.729-80.917-57.563-107.281-107.26l31.635-42.052c8.219-8.208,11.167-20.198,7.635-31.448
       c-7.26-21.99-10.948-45.063-10.948-68.583C132.146,13.823,118.323,0,101.333,0H30.813C13.823,0,0,13.823,0,30.813
       C0,225.563,158.438,384,353.188,384c16.99,0,30.813-13.823,30.813-30.813v-70.323C384,265.875,370.177,252.052,353.188,252.052z"
       />
</svg>`;
const PhoneIcon=() =>
   <SvgCss xml={xml} width="60%" height="60%" />
export default PhoneIcon;