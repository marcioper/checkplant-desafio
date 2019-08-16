import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import {FloatingAction} from 'react-native-floating-action';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import AsyncStorage from '@react-native-community/async-storage';
import {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {Creators as NotesActions} from '~/store/ducks/notes';
import 'moment/locale/pt-br';
import Location from '~/util/location';

import styles from './styles';

import IconRefresh from '~/assets/images/icons/refresh.png';
import IconEdit from '~/assets/images/icons/edit.png';
import {colors} from '~/styles';

import stringsUtil from '~/util/strings';

MapboxGL.setAccessToken(stringsUtil.keys.mapboxtoken);

export default function Main({navigation}) {
  const [latitudeInitial, setLatitudeInitial] = useState(0);
  const [longitudeInitial, setLongitudeInitial] = useState(0);
  const [latitudeCurrent, setLatitudeCurrent] = useState(0);
  const [longitudeCurrent, setLongitudeCurrent] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [listSync, setListSync] = useState([]);
  const [listNotSync, setListNotSync] = useState([]);
  const [modalDate, setModalDate] = useState('');
  const [modalText, setModalText] = useState('');
  const notes = useSelector(state => state.notes);

  const dispatch = useDispatch();

  // console.disableYellowBox = true;

  function getCurrentPositionInitial(coords) {
    const {latitude: lat, longitude: long} = coords;
    setLatitudeInitial(lat);
    setLongitudeInitial(long);
    // console.tron.log(`latitude: ${lat}`);
    // console.tron.log(`longitude: ${long}`);
  }

  const managerLists = useCallback(async () => {
    let listNotesJSON = await AsyncStorage.getItem(
      stringsUtil.storage.listNotes,
    );
    if (listNotesJSON !== null) {
      listNotesJSON = JSON.parse(listNotesJSON);
      // console.tron.log(`Main: ${JSON.stringify(listNotesJSON)}`);
      const newListNotSync = listNotesJSON.filter(note => {
        return note.sync === false;
      });
      setListNotSync(newListNotSync);
      const newListSync = listNotesJSON.filter(note => {
        return note.sync === true;
      });
      setListSync(newListSync);
      // console.tron.log(`Main listNotSync: ${JSON.stringify(newListNotSync)}`);
      // console.tron.log(`Main listSync: ${JSON.stringify(newListSync)}`);
    }
  }, []);

  useEffect(() => {
    const initial = async () => {
      Location.checkPermissions(getCurrentPositionInitial);
      // await AsyncStorage.clear();

      await managerLists();

      navigation.getParam('reload');
    };
    initial();
  }, [managerLists, navigation]);

  const actions = [
    {
      text: 'Sincronizar',
      icon: IconRefresh,
      color: colors.primary,
      name: 'bt_refresh',
      position: 2,
    },
    {
      text: 'Adicionar',
      icon: IconEdit,
      color: colors.primary,
      name: 'bt_edit',
      position: 1,
    },
  ];

  function syncData() {
    NetInfo.isConnected.fetch().done(async isConnected => {
      if (isConnected) {
        dispatch(NotesActions.addNoteRequest());
      } else {
        showMessage({
          message: 'Sem Internet, verifique a conexão e tente novamente!',
          type: 'warning',
          icon: 'warning',
        });
      }
    });
  }

  useEffect(() => {
    if (notes.success !== null && notes.success !== '') {
      showMessage({
        message: notes.success,
        type: 'success',
        icon: 'success',
      });

      managerLists();
    }
  }, [notes.success]);

  const handleAddNote = async () => {
    navigation.navigate('AddNote', {
      latParam: latitudeCurrent,
      longParam: longitudeCurrent,
    });
  };

  const handleDetailNote = async (index, sync) => {
    let array = [];
    if (sync) array = listSync;
    else array = listNotSync;
    setModalDate(array[index].date);
    setModalText(array[index].description);
    setModalVisible(true);
  };

  function handleRegionChange(event) {
    const {geometry} = event;
    const lat = geometry.coordinates[1];
    const long = geometry.coordinates[0];
    setLatitudeCurrent(lat);
    setLongitudeCurrent(long);
    // console.tron.log(`latitud: ${lat}`);
    // console.tron.log(`longitud: ${long}`);
  }

  const renderSyncs = () => {
    return (
      <>
        {listSync.map((note, index) => (
          <MapboxGL.PointAnnotation
            key={String(note.id)}
            id={String(note.id)}
            coordinate={[note.longitude, note.latitude]}>
            <TouchableOpacity
              onPress={() => {
                handleDetailNote(index, true);
              }}>
              <View style={styles.annotationContainer}>
                <View style={styles.annotationSyncFill} />
              </View>
            </TouchableOpacity>
          </MapboxGL.PointAnnotation>
        ))}
      </>
    );
  };

  const renderNoSyncs = () => {
    return (
      <>
        {listNotSync.map((note, index) => (
          <MapboxGL.PointAnnotation
            key={String(note.id)}
            id={String(note.id)}
            coordinate={[note.longitude, note.latitude]}>
            <TouchableOpacity
              onPress={() => {
                handleDetailNote(index, false);
              }}>
              <View style={styles.annotationContainer}>
                <View style={styles.annotationNoSyncFill} />
              </View>
            </TouchableOpacity>
          </MapboxGL.PointAnnotation>
        ))}
      </>
    );
  };

  return (
    <>
      <Spinner
        visible={notes.loading}
        textContent="Sincronização em andamento..."
        textStyle={styles.spinnerTextStyle}
      />
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.popup}>
            <Text style={styles.date}>
              {moment(modalDate).format('DD/MM/YYYY HH:mm:ss')}
            </Text>
            <ScrollView>
              <Text style={styles.note}>{modalText}</Text>
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <MapboxGL.MapView
        centerCoordinate={[longitudeInitial, latitudeInitial]}
        style={styles.container}
        showUserLocation
        zoomLevel={14}
        onRegionDidChange={event => {
          handleRegionChange(event);
        }}
        styleURL={MapboxGL.StyleURL.Light}>
        {renderSyncs()}
        {renderNoSyncs()}
      </MapboxGL.MapView>
      <FloatingAction
        actions={actions}
        color={colors.primary}
        onPressItem={name => {
          if (name === 'bt_edit') handleAddNote();
          else syncData();
        }}
      />
    </>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
