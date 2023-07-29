import React,{useState} from 'react';
import {View} from 'react-native';
import Card from '../../components/card';
import TextBox from '../../components/TextBox';
import Stars from '../../components/StarRatting';
import { shortDate } from '../../utils/funcations';
import { spacing } from '../../res/appStyles';
export const ReviewCard = (props) => {
    let  lines =1
    const {item} =props
 
    const [show,setShowValue]=useState(false)
    if(item.review)
    {  lines = item.review.split("\r\n|\r|\n").length;
      if(item.review.length>40)
      lines=item.review.length
    }

  return (
    <Card type="list" style={{marginBottom: 5}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <TextBox type="body3" style={{  flex: 1}}>
          {item.rater?`${item.rater.first_name} ${item.rater.last_name}`:' '}
        </TextBox>
        <TextBox type="body3" >
          {shortDate(item.created_at)} 
        </TextBox>
      </View>
      <View style={{height: 30}}>
        <Stars desable={true} rate={item.rating} size={spacing(22)} />
      </View>
      <TextBox style={{flex:1}} type="heading1" numberOfLines={show?null:1}>
        {item.review}
      </TextBox>
      {lines>1? <TextBox onPress={()=>setShowValue(!show)}type='normal'>{!show?"Read More":"Hide"}</TextBox>:null }
       
    </Card>
  );
};
