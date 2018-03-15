import * as firebase from 'firebase';

const prodConfig = {
  apiKey: 'AIzaSyC14TDzm3SSt8VqBQYx-DEc7t-4p7Z4rRo',
  authDomain: 'inventory-service-70274.firebaseapp.com',
  databaseURL: 'https://inventory-service-70274.firebaseio.com',
  projectId: 'inventory-service-70274',
  storageBucket: 'inventory-service-70274.appspot.com',
  messagingSenderId: '189137843330',
};

const devConfig = {
  apiKey: 'AIzaSyDOuyT0zESVhBxRcVvdGEtMq2YVcys3rQI',
  authDomain: 'inventory-service-b1875.firebaseapp.com',
  databaseURL: 'https://inventory-service-b1875.firebaseio.com',
  projectId: 'inventory-service-b1875',
  storageBucket: 'inventory-service-b1875.appspot.com',
  messagingSenderId: '913357789158',
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
