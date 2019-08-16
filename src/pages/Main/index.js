import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
// import Modal from 'react-native-modal';

import {FloatingAction} from 'react-native-floating-action';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
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

  function getCurrentPositionInitial(coords) {
    const {latitude: lat, longitude: long} = coords;
    setLatitudeInitial(lat);
    setLongitudeInitial(long);
    // console.tron.log(`latitude: ${lat}`);
    // console.tron.log(`longitude: ${long}`);
  }

  useEffect(() => {
    Location.checkPermissions(getCurrentPositionInitial);
  }, []);

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

  function syncData() {}

  const handleAddNote = async () => {
    navigation.navigate('AddNote', {
      latParam: latitudeCurrent,
      longParam: longitudeCurrent,
    });
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
      <MapboxGL.PointAnnotation
        key="1"
        id="1"
        coordinate={[-49.26536, -16.685291]}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <View style={styles.annotationContainer}>
            <View style={styles.annotationSyncFill} />
          </View>
        </TouchableOpacity>
      </MapboxGL.PointAnnotation>
    );
  };

  const renderNoSyncs = () => {
    return (
      <>
        <MapboxGL.PointAnnotation
          key="2"
          id="2"
          coordinate={[-49.264502, -16.687963]}>
          <View
            onPressItem={() => Alert.alert('Modal open.')}
            style={styles.annotationContainer}>
            <View style={styles.annotationNoSyncFill} />
          </View>
          <MapboxGL.Callout title="Marcio House" />
        </MapboxGL.PointAnnotation>
        <MapboxGL.PointAnnotation
          key="3"
          id="3"
          coordinate={[-49.256351, -16.680892]}>
          <View style={styles.annotationContainer}>
            <View style={styles.annotationNoSyncFill} />
          </View>
          <MapboxGL.Callout title="Marcio House" />
        </MapboxGL.PointAnnotation>
      </>
    );
  };

  return (
    <>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.popup}>
            <Text style={styles.date}>15/08/2019</Text>
            <ScrollView>
              <Text style={styles.note}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book
              </Text>
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
  }).isRequired,
};
