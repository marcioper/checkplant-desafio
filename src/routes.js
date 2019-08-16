import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import Main from '~/pages/Main';
import AddNote from '~/pages/AddNote';

import {colors} from '~/styles';

const AppStack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    },
  },
  AddNote: {
    screen: AddNote,
    navigationOptions: {
      title: 'Anotação',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
});

const Routes = createAppContainer(
  createSwitchNavigator({App: AppStack}, {initialRouteName: 'App'}),
);

export default Routes;
