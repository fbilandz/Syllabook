import RNFirebase from 'react-native-firebase';

const configurationOptions = {
    debug: true,
    persistance: true,
    errorOnMissingPlayServices: false,
};

const firebase = RNFirebase.initializeApp(configurationOptions);

export default firebase;