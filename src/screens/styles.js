import {StyleSheet} from 'react-native';
import {colors, spacing} from '../res/appStyles';
export const outstyle = StyleSheet.create({
  body1: {
    backgroundColor: colors.background2,
    flex: 1,
  },
  card2: {
    borderRadius: 0,
    marginBottom: spacing(5),
    elevation: 1,
    padding: 0,
  },
  card: {
    borderRadius: 0,
    marginBottom: spacing(5),
    elevation: 1,
    padding: 0,
  },
  phonePicker: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },

  methodRow: {
    padding: spacing(1),
    borderBottomColor: colors.borderGrey2,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  rowTitle: {
    color: colors.grey,
    marginBottom: spacing(5),
  },

  checkBox: {
    height: spacing(20),
    width: spacing(20),
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: spacing(2),
    marginRight: spacing(15),
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateTimeRow: {
    padding: spacing(15),
    borderBottomColor: colors.borderGrey2,
    borderBottomWidth: 1,
  },
  body2: {
    backgroundColor: colors.white,
    flex: 1,
  },
  orderCard: {
    borderRadius: 0,
    marginTop: spacing(5),
  },
  orderTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing(5),
    paddingBottom: 0,
  },
  card1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    elevation: 1,
  },
  tab: {
    padding: spacing(14),
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomColor: colors.tint,
    borderBottomWidth: 2,
  },
  activeTxt: {
    color: colors.tint,
  },
  itemImage: {
    width: spacing(40),
    height: spacing(40),
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing(10),
    paddingHorizontal: spacing(15),
  },
});
