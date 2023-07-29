import React from 'react';
import {View, Image, Text} from 'react-native';
import {scales, fontSize, spacing} from '../../res/appStyles';
import {connect} from 'react-redux';

const IMG0 = require(`../../../assets/images/waiting.png`);
const IMG1 = require(`../../../assets/images/confirmed.png`);
const IMG2 = require(`../../../assets/images/pickedup.png`);
const IMG3 = require(`../../../assets/images/checked.png`);
const IMG4 = require(`../../../assets/images/inprocess.png`);
const IMG5 = require(`../../../assets/images/shipped-small.png`);
const IMG6 = require(`../../../assets/images/delivered.png`);

class OrderSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 1,
    };
  }

  renderIcon = t => {
    const backColor =
      this.props.curPosition >= t.id ? '#00000000' : '#ffffffcc';
    // console.log(this.props.curPosition, ' this.props.curPosition........');
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <Image
          source={t.img}
          style={{
            height: scales(25),
            width: scales(25),
            marginTop: spacing(5),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: fontSize(10),
            marginBottom: spacing(5),
            textAlign: 'center',
          }}>
          {t.name}
        </Text>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: backColor,
            position: 'absolute',
          }}
        />
      </View>
    );
  };

  render() {
    const {LngCode} = this.props;
    const days = [
      {
        id: 0,
        name: LngCode.ORDER_IN_REVIEW,

        img: IMG0,
      },
      {
        id: 1,
        name: LngCode.LABEL_ORDER_CONFIRM,

        img: IMG1,
      },

      {
        id: 2,
        name: LngCode.LABEL_PICKUP,

        img: IMG2,
      },
      {
        id: 3,
        name: LngCode.RECEIVED_LABEL,
        img: IMG3,
      },
      {
        id: 4,
        name: LngCode.LABEL_IN_PROCESS,
        img: IMG4,
      },
      {
        id: 5,
        name: LngCode.LABEL_SHIPPED,
        img: IMG5,
      },
      {
        id: 6,
        name: LngCode.LABEL_DELIVERD,
        img: IMG6,
      },
    ];

    return (
      <View style={[{flexDirection: 'row'}, this.props.style]}>
        {days.map(t => this.renderIcon(t))}
      </View>
    );
  }

  onPageChange(position) {
    this.setState({currentPosition: position});
  }
}

const mapStateToProps = ({LngCode}) => {
  return {LngCode};
};
export default connect(mapStateToProps, {})(OrderSteps);
