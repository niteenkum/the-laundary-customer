import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {spacing, colors} from '../../../res/appStyles';
import TextBox from '../../../components/TextBox';
import RoundBtn from '../../../components/roundBtn';
import PopView from '../../../components/popView';
import Card from '../../../components/card';
import {InputBox} from '../../../components/inputBox';
import {API, API_KEY} from '../../../config/googleApi';
import {setAsyncStorage, getAsyncStorage} from '../../../utils/asyncStorage';
import {STORAGES} from '../../../res/ConstVariable';
import { connect } from 'react-redux';
  const ZipcodeCard = props => {
const {LngCode={}}=props
  const [loading, setLoading] = useState(false);
  const [zipcode, setZipCode] = useState('');
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => {
    if (!props.visible) getStoredData();
  }, []);
  const getStoredData = async () => {
    getAsyncStorage(STORAGES.ADDDRESS).then(res => {
      if (res) {
        const {data = {}} = JSON.parse(res);
        setAddress(data.address);
        setZipCode(data.zipcode);
        setLocation(data.location);
        props.getService(data);
      } else props.onRequestClose(true);
    });
  };

  const getAddressApi = () => {
    setLoading(true);
    setErr('');
    const enpoint = zipcode
      ? `address=${zipcode}&sensor=true&key=${API_KEY.GOOGLE_MAP_API}`
      : `latlng=${location.latitude},${location.longitude}&key=${
          API_KEY.GOOGLE_MAP_API
        }`;
    fetch(`${API.GOOGLE_MAP_API}?${enpoint}`)
      .then(response => response.json())
      .then(responseJson => {
        const {results = []} = responseJson;
        getLatAndLng(results);
      })
      .catch(error => {
        setLoading(false);
         setErr(LngCode.MSG_INVALID_ZIPCODE);
      });
  };

  const getLatAndLng = async (results = []) => {
    let code = zipcode;
    if (results.length) {
      console.log('getLatAndLng', results[0]);
      const {formatted_address, geometry, address_components = []} = results[0];
      setAddress(formatted_address);
      setLocation(geometry.location);
      props.onRequestClose(false);
      //  await address_components.map(add => {
      //     if (add.types.indexOf('postal_code') !== -1) {
      //         code=add.long_name
      //      }
      //   });
      //   setZipCode(code);
      onStoreInlocal(formatted_address, geometry.location, code);
    } else {
      setErr(LngCode.MSG_INVALID_ZIPCODE);
      setLoading(false);
    }
  };

  const onStoreInlocal = (add, loc = {}, code) => {
    const data = {
      zipcode: code,
      location: loc,
      address: add,
    };
    const ss = JSON.stringify({data});
    console.log('ss', ss, data);
    setAsyncStorage(STORAGES.ADDDRESS, ss).then(res => {
      props.getService(data);
      props.onRequestClose(false);
    });
    setLoading(false);
  };

  return (
    <View style={{width: '100%', backgroundColor: colors.tint}}>
      <PopView
        visible={props.visible}
        onRequestClose={() => props.onRequestClose(false)}>
        <Card type="list" style={{width: '100%', paddingVertical: spacing(20)}}>
          <InputBox
            value={zipcode}
            placeholder={LngCode.LABEL_ENTER_ZIPCODE}
            error={err}
            errorMge={err}
            onChange={txt => setZipCode(txt)}
          />
          <TextBox style={{padding: spacing(10)}}>{address}</TextBox>
          <RoundBtn
            loading={loading}
            onPress={() => getAddressApi()}
            
            title={LngCode.LABEL_SAVE}
          />
        </Card>
      </PopView>
      <TouchableOpacity
        onPress={() => props.onRequestClose(true)}
        style={{
          width: '100%',
          height: spacing(40),
          borderColor: colors.white,
          borderTopWidth: spacing(1),
          borderBottomWidth: spacing(1),
          justifyContent: 'space-between',
          paddingHorizontal: spacing(20),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <TextBox type="body3" color="white">
            {LngCode.LABEL_ZIPCODE} : {props.zipcode}
          </TextBox>
          {address ? (
            <TextBox type="caption" color="white" style={{flex: 1}}>
              {address}
            </TextBox>
          ) : null}
        </View>
        <View
          style={{height: '100%', width: 1, backgroundColor: colors.white}}
        />
        <TextBox type="body4" color="white">
          {'  '}
          {zipcode ? LngCode.LABEL_CHNAGE:LngCode.LABEL_ADD }
        </TextBox>
      </TouchableOpacity>
      {!props.zipcode ? (
        <TextBox
          style={{
            alignSelf: 'center',
            marginVertical: spacing(20),
            color: colors.white,
          }}>
           {LngCode.MSG_NO_SERVICE}
        </TextBox>
      ) : null}
    </View>
  );
};
const mapStateToProps = ({ProductData, LngCode}) => {
  console.log('Product mapStateToProps', ProductData);
  const {
 
  } = ProductData;
return {
 
};
};

export default connect(
mapStateToProps,
{
 
},
)(ZipcodeCard);

