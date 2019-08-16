import {StyleSheet} from 'react-native';
import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerForm: {
    flex: 1,
    marginHorizontal: metrics.baseMargin + 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.lighter,
  },

  title: {
    fontSize: 25,
    color: colors.primary,
    fontWeight: '500',
    letterSpacing: 1,
    marginTop: 5,
  },

  textInput: {
    height: 200,
    fontSize: 16,
    color: colors.black,
    marginTop: metrics.baseMargin,
    marginBottom: metrics.baseMargin,
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
