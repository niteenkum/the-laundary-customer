//function to fetch transaction status of a transaction
import {generateRandomString as PaytmChecksum} from './paytmcheck';

//function to fetch transaction status of a transaction
export function FetchTxnStatus(data) {
  var paytmParams = {};
  paytmParams.body = {
    mid: 'hSMNyS24308375269664',
    orderId: '1',
  };
  PaytmChecksum(JSON.stringify(paytmParams.body), 'ylUfi_EyhAYfPYAhf').then(
    function (checksum) {
      paytmParams.head = {
        signature: checksum,
      };
      var post_data = JSON.stringify(paytmParams);
      var options = {
        hostname: 'securegw-stage.paytm.in',
        /* for Production */
        // hostname: 'securegw.paytm.in',
        port: 443,
        path: '/v3/order/status',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': post_data.length,
        },
        body: post_data,
      };
      fetch('https://securegw-stage.paytm.in/v3/order/status', options).then(
        response => {
          response
            .json()
            .then(txnStatus => {
              if (txnStatus.body.resultInfo.resultCode == '01') {
                //show that the transaction was successful
                //You can call a function to confirm the payment
                console.log('Transaction Successful');
              } else {
                //show that there was some problem with transaction
                //txnStatus.body.resultInfo.resultCode=="400" means pending
                //complete list of responses and their meanings
              }
            })
            .catch(error => {
              //handle error
              console.log(error);
            });
        },
      );
    },
  );
}
