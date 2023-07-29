import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import TextBox from '../TextBox';
import {colors} from '../../res/appStyles';
import {fontSizes} from '../../res/appStyles';
import StepIndicator from './StepIndicator';
import {connect} from 'react-redux';

const customStyles = {
  separatorStrokeWidth: 1,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#aaaaaa',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.white,
  stepIndicatorUnFinishedColor: colors.white,
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: colors.stepsTxt,
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 50,
  stepStrokeCurrentColor: colors.white,
  separatorFinishedColor: colors.tint,
};

const images = [
  require(`../../../assets/images/map.png`),
  require(`../../../assets/images/calendar.png`),
  require(`../../../assets/images/payment-method.png`),
  require(`../../../assets/images/checked.png`),
];

class PickupSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: this.getLabel(props),
    };
  }

  getLabel = props => {
    const {LngCode} = props;
    return [
      LngCode.LOCATION_LABEL,
      LngCode.LABEL_DATE_TIME,
      LngCode.LABEL_PAYMENT,
      LngCode.LABEL_COMPLETE,
    ];
  };

  renderLabels = ({position}) => {
    const {curPosition} = this.props;
    const {labels} = this.state;
    return (
      <View>
        <TextBox
          style={{
            color:
              curPosition === position ? colors.stepsTxt : colors.lightGrey2,
            fontSize: fontSizes.FONT_10,
            marginTop: -5,
          }}
          type="caption">
          {labels[position]}
        </TextBox>
      </View>
    );
  };

  renderIcon = ({position}) => {
    const {curPosition} = this.props;
    const backgroundColor =
      curPosition === position
        ? 'rgba(255, 255, 255, 0.0)'
        : 'rgba(255, 255, 255, 0.7)';
    return (
      <TouchableOpacity disabled>
        <ImageBackground
          resizeMode="contain"
          source={images[position]}
          style={{height: 30, width: 40, borderRadius: 20}}>
          <View
            style={{backgroundColor, width: 40, height: 40, borderRadius: 20}}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  render() {
    const {labels = []} = this.state;
    const {style, curPosition} = this.props;
    return (
      <View style={[{paddingVertical: 5}, this.props.style]}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={curPosition}
          labels={labels}
          stepCount={4}
          renderLabel={data => this.renderLabels(data)}
          renderStepIndicator={data => this.renderIcon(data)}
        />
      </View>
    );
  }
}
const mapStateToProps = ({LngCode}) => ({LngCode});

export default connect(mapStateToProps, {})(PickupSteps);
