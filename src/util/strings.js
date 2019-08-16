import env from '../../env';

export default {
  keys: {
    googletoken: env.GOOGLE_KEY_GEOCODE,
    mapboxtoken: env.MAPBOX_ACCESS_TOKEN,
  },
  storage: {
    listNotes: '@CheckplantApp:listNotes',
    listSync: '@CheckplantApp:listSync',
    listNoSync: '@CheckplantApp:listNoSync',
  },
  label: {
    mainPage: 'Checkplant App',
  },
};
