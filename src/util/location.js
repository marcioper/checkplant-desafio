import {
  Platform,
  PermissionsAndroid,
  NativeModules,
  Linking,
  Alert,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

const Location = {
  openAppSettings() {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      const {RNAndroidOpenSettings} = NativeModules;
      RNAndroidOpenSettings.appDetailsSettings();
    }
  },

  showAlert() {
    Alert.alert(
      'Localization',
      'Permitir acesso a sua localização para salvar os registros',
      [
        {
          text: 'Pergunte depois',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Continuar não permitindo',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Permitir',
          onPress: () => this.openAppSettings(),
        },
      ],
      {
        cancelable: false,
      },
    );
  },

  requestPermissions(parentFunction) {
    try {
      Geolocation.getCurrentPosition(
        response => {
          parentFunction(response.coords);
        },
        error => {
          if (error.PERMISSION_DENIED === 1) {
            this.showAlert();
          }
        },
      );
    } catch (err) {
      console.error(`An error occurred at requestPermissions -> ${err}`);
    }
  },

  checkPermissions(parentFunction) {
    try {
      if (Platform.OS === 'ios') {
        this.requestPermissions(parentFunction);
      } else {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Localization',
            message:
              'Permitir acesso a sua localização para salvar os registros.',
            buttonNeutral: 'Pergunte depois',
            buttonNegative: 'Continuar não permitindo',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.requestPermissions(parentFunction);
        } else {
          this.showAlert();
        }
      }
    } catch (err) {
      console.error(`An error occurred at checkPermissions -> ${err}`);
    }
  },
};

export {Location as default};
