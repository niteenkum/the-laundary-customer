import React, {Component} from 'react';
const crypto = require('./../../crypto');

import {randomBytes} from 'react-native-randombytes';

// export function PaytmChecksum() {
//   console.log('error occurred in generateRandomString: ', generateRandomString);
export const generateRandomString = length => {
  console.log('error occurred in generateRandomString: ', length);
  return new Promise(function (resolve, reject) {
    randomBytes((length * 3.0) / 4.0, function (err, buf) {
      if (!err) {
        var salt = buf.toString('base64');
        resolve(salt);
      } else {
        console.log('error occurred in generateRandomString: ' + err);
        reject(err);
      }
    });
  });
};
// }
