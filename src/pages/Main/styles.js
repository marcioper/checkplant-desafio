import {StyleSheet} from 'react-native';
import {colors} from '~/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.lighter,
  },
  welcome: {
    color: colors.dark,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
