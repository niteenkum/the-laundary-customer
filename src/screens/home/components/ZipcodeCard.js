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
import {connect} from 'react-redux';
const ZipcodeCard = props => {
  const {LngCode = {}} = props;
  const [loading, setLoading] = useState(false);
  const [zipcode, setZipCode] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => {
    if (!props.visible) getStoredData();
  }, []);
  const getStoredData = async () => {
    getAsyncStorage(STORAGES.ADDDRESS).then(res => {
      if (res) {
        const {code, city} = JSON.parse(res);

        if (code) {
          setZipCode(code);
          props.getService({zipcode: code});
        } else props.onRequestClose(true);
      } else props.onRequestClose(true);
    });
  };

  const {code, city} = props.zipdata;
  useEffect(() => {
    if (props.visible && props.zipdata && props.zipdata.code && loading)
      onSetCode();
    if (props.fail2 && loading) {
      props.onRequestClose(false);
      setLoading(false);
    }
  }, [props.zipdata, props.fail2]);

  const onSetCode = async () => {
    const data = {...props.zipdata};
    console.log('useEffect', JSON.stringify(data));
    await setAsyncStorage(STORAGES.ADDDRESS, JSON.stringify(data));
    props.onRequestClose(false);
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
          <TextBox style={{padding: spacing(10)}}>{city}</TextBox>
          <RoundBtn
            loading={loading}
            onPress={() => {
              setLoading(true);
              props.getService({zipcode});
            }}
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
            {LngCode.LABEL_ZIPCODE} : {code ? code : zipcode}
          </TextBox>
          {city ? (
            <TextBox type="caption" color="white" style={{flex: 1}}>
              {city}
            </TextBox>
          ) : null}
        </View>
        <View
          style={{height: '100%', width: 1, backgroundColor: colors.white}}
        />
        <TextBox type="body4" color="white">
          {zipcode ? LngCode.LABEL_CHNAGE : LngCode.LABEL_ADD}
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
  const {zipdata, fail2} = ProductData;
  return {
    zipdata,
    fail2,
  };
};

export default connect(mapStateToProps, {})(ZipcodeCard);
