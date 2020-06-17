const firebaseConfig = {
  apiKey: 'AIzaSyAYNoXHQPv55Q3L6fvaRVwtpuroLR4gsa4',
  authDomain: 'childcare-hotel-prod.firebaseapp.com',
  databaseURL:
    'https://childcare-hotel-prod.firebaseio.com',
  projectId: 'childcare-hotel-prod',
  storageBucket: 'childcare-hotel-prod.appspot.com',
  messagingSenderId: '294806390044',
  appId: '1:294806390044:web:80735826f141a2e872a6d9',
  measurementId: 'G-STW4LZ6VSB',
};

// Cloud Functions
const backendUrl = `https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net/api/graphql`;

// App Engine
// const backendUrl = `<insert app engine url here>`;

export default {
  firebaseConfig,
  backendUrl,
};
