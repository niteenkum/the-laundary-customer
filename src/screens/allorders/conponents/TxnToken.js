//method to get txn token
import {startTransaction} from './Transaction';
import {generateRandomString as PaytmChecksum} from './paytmcheck';
const merchantId = 'hSMNyS24308375269664';
const data = {orderId: '01', txnAmount: '1', customerId: '001'};
export function getTxnToken(data) {
  var paytmParams = {};
  paytmParams.body = {
    requestType: 'Payment',
    mid: merchantId,
    websiteName: 'WEBSTAGING',
    orderId: data.orderId + '',
    callbackUrl: 'https://merchant.com/callback',
    txnAmount: {
      value: data.txnAmount,
      currency: 'INR',
    },
    userInfo: {
      custId: data.customerId,
    },
    //You can enable any other modes if you want
    enablePaymentMode: [
      {mode: 'UPI', channel: ['UPI', 'UPIPUSH']},
      {mode: 'DEBIT_CARD', channel: ['RUPAY']},
    ],
  };
  PaytmChecksum(JSON.stringify(paytmParams.body), 'L&qCdepjSHKzEX0l').then(
    function (checksum) {
      paytmParams.head = {
        signature: checksum,
      };
      var post_data = JSON.stringify(paytmParams);
      var options = {
        /* for Staging */
        hostname: 'securegw-stage.paytm.in',
        /* for Production */
        // hostname: 'securegw.paytm.in',
        port: 443,
        path:
          '/theia/api/v1/initiateTransaction?' +
          'mid=' +
          merchantId +
          '&orderId=' +
          data.orderId +
          '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': post_data.length,
        },
        body: post_data,
      };
      fetch(
        'https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=' +
          merchantId +
          '=' +
          data.orderId +
          '',
        options,
      ).then(response => {
        response
          .json()
          .then(txnToken => {
            //here call the method to start transaction.

            startTransaction({orderId: '01', txnToken: txnToken, amount: '1'});
          })
          .catch(error => {
            //Handle the error
            console.log(error);
          });
      });
    },
  );
}
