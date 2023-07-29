import {colors, fonts, spacing} from '../../res/appStyles';
import React ,{ Component }from 'react';
import {View, Text, StyleSheet, Image,Animated,TouchableOpacity} from 'react-native';

const starFilled = count => {
  const star = [];
  for (let i = 1; i <= 5; i++) {
    if (count >= i)
      star.push(
        <Image
          style={styles.stars}
          source={require('../../../assets/images/star_fill.png')}
        />,
      );
    else
      star.push(
        <Image
          style={styles.stars}
          source={require('../../../assets/images/star_empty.png')}
        />,
      );
  }
  return star;
};

 export function StartRating(props) {
  const {count = 0} = props;
  return (
    <View style={{marginVertical: spacing(5)}}>
      <View style={{flexDirection: 'row'}}>
        {starFilled(count)}
        <Text style={styles.ratingText}>{`(${parseFloat(count).toFixed(
          1,
        )})`}</Text>
      </View>
    </View>
  );
}
class Stars extends Component {
  setRatting = () => {
    const { size = 32, rate = 1 } = this.props;
    const str = [];

    for (let i = 1; i <= 5; i++) {
      if (rate < i) str.push(  <Image
          style={styles.stars}
          source={require('../../../assets/images/star_empty.png')}
        />);
      else str.push( <Image
          style={styles.stars}
          source={require('../../../assets/images/star_fill.png')}
        />,);
    }
    return str;
  };

  render() {
    const { desable = false, setRate } = this.props;
    const starData = this.setRatting() || [];
    return (
      <Animated.View style={{ flexDirection: 'row' }}>
        {starData.map((t, idx) => (
          <TouchableOpacity disabled={desable || !setRate} onPress={() => setRate(idx + 1)}>
            {t}
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  }
}
export default Stars;



const styles = StyleSheet.create({
  stars: {
    height: spacing(16),
    width: spacing(16),
    marginRight: 2,
  },
  ratingText: {
    color: colors.grey,
    fontSize: spacing(14),
    fontFamily: fonts.semibold,
    marginLeft: spacing(10),
  },
});
