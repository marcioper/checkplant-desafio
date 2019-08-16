import {StyleSheet} from 'react-native';
import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.white,
  },
  annotationContainer: {
    width: 24,
    height: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  annotationSyncFill: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: colors.regular,
    transform: [{scale: 0.8}],
  },
  annotationNoSyncFill: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: colors.success,
    transform: [{scale: 0.8}],
  },
  popup: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    width: '100%',
    marginTop: metrics.baseMargin * 2,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.dark,
    marginBottom: 10,
    paddingLeft: 20,
  },
  note: {
    flex: 1,
    fontSize: 16,
    color: colors.dark,
    paddingLeft: 20,
  },
  button: {
    height: 50,
    width: metrics.screenWidth - 30,
    backgroundColor: colors.secundary,
    borderRadius: metrics.baseRadius,
    paddingHorizontal: metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.baseMargin,
  },

  buttonText: {
    color: colors.lighter,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;
