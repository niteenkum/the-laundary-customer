import {colors, spacing} from '../res/appStyles';

export const defaultHeaderStyles = {
  headerStyle: {
    backgroundColor: colors.tint,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    elevation: 0,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    // marginLeft: spacing(-30),
  },
  headerRightContainerStyle: {
    marginRight: 10,
  },
};
