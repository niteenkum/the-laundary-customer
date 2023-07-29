import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import {colors, spacing} from '../../../res/appStyles';
import {saveOrder} from '../../../redux/actions/order.action';
import {STORAGES} from '../../../res/ConstVariable/';
import AsyncStorage from '@react-native-community/async-storage';
import {Environment} from '../../../config/environment';
const Transection = props => {
  const [token, setToken] = useState([]);
  const [ids, setIds] = useState('');
  const[hide,setHide]=useState(false)
  const[userToken,setuserToken]=useState([])
  const {id, price = '', user_id} = props;
  
//   Merchant ID
// nibvUY24666375231113
// Merchant Key
// @3zZbAFwyUEcW8sV
// Website
// DEFAULT
// Industry Type
// RetailP
// Channel ID (For Website)
// WEB  
// Channel ID (For Mobile Apps)
// WAP
// `http://172.105.35.91/thelaundrymachine/public/api/checksum/create?mid=hSMNyS24308375269664&orderId=${props.id}`,
const mid ='nibvUY24666375231113 '
 const getUserToken = async () => {
  await AsyncStorage.getItem(STORAGES.USER).then(tokenn=>{setuserToken(JSON.parse(tokenn).token)
    console.log('...........',JSON.parse(tokenn).token,)
    console.log(userToken,'cccmm')
   });
    

 
};



  const fetchTxt = async () => {
    fetch(
      // `https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=nibvUY24666375231113&orderId=${props.id}`,
     
      `https://thelaundrymachine.in/api/checksum/create?mid=nibvUY24666375231113&orderId=${props.id}`,
      
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          mid: 'nibvUY24666375231113',
          order_id: props.id,
          customer_id: props.user_id,
          Website:'WEBSTAGING',
          requestType: "Payment",
          value: props.price,

        }),
      },
    )
      .then(res => res.json())
      .then(resData => {
        console.log('resdata validate....', resData.data.body.txnToken);
     
        setToken(resData.data?.body?.txnToken);
        //  global.Toaster("token");
        return resData.data?.body?.txnToken;
       
        if (resData.data) {
        }
      console.log(txnToken, '??????????');
      })
      .catch(function (error) {
        console.log('Something went wrong.', error);
      });
  };
  const UpdatePayment = async (result,status) => {
    console.log(result,status,"azsfgvhjkl.......;;;;;")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    
var formdata = new FormData();
formdata.append("order_id", props.order_id);
formdata.append("payment_status", status);
formdata.append("payment_json",JSON.stringify(result));

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://thelaundrymachine.in/api/savePayment", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  };

  const clickToPay = () => {
    AllInOneSDKManager.startTransaction(
      //'87',
       ids.toString(),
      // '233',
      //'PYTM_ORDR_1491',
      'nibvUY24666375231113',
      token,
       props.price.toString(),
      'https://thelaundrymachine.in/',
      true,
      false,
      'urlScheme',
    )
      .then(result => {
         
        UpdatePayment(result,'sucess')
         setHide(true)
        global.Toaster("Payment Sucessfull");
        console.log(result, 'RESULT');
       
        console.log(props.id, 'RESULT');
      })
      .catch(result => {
       console.log(result, 'ERROR');
     
       UpdatePayment("{fail,f}",'fail')
       setHide(false)
       console.log(hide,'............')
        global.Toaster("Transaction denied due to dublicate Token");
        console.log(result, 'RESULTdenied......');

      });
  };
  useEffect(() => {
    // token;
    fetchTxt();
      getUserToken();
    //  userToken
    //  UpdatePayment()
 
    // console.log(
    //   props.id,
     
    //   props.user_id,
    //   props.price,
    //   ids,
    //   '1',
    //   'dataaaaaaaaaaaaaaaaaaaa......',
    // );
    setIds(props.id);
   
  }, []);
  return (
    <View>
      {hide==false?
      <TouchableOpacity style={styles.buttonStyle} onPress={clickToPay}>
        <Text style={styles.textStyle}>Pay Now</Text>
      </TouchableOpacity>
      :null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: 'grey',

  },
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c86d4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    padding: 8,
  },
  textStyle: {
    marginStart: 4,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.white,
  },
  textInput: {
    fontSize: 18,
    padding: 8,
    borderColor: 'gray',
    marginStart: 8,
    marginEnd: 8,
    borderBottomWidth: 1,
  },
  buttonStyle: {
    padding: 9,
    margin: 8,
    backgroundColor: colors.tint,
  },
  messageText: {
    fontSize: 16,
    padding: 8,
  },
});

export default Transection;
