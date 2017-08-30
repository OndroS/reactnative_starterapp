import * as Firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDwH61DbgfePxWWVHenkukrmfa_yqCogkk",
  authDomain: "podmevontest.firebaseapp.com",
  databaseURL: "https://podmevontest.firebaseio.com"
};
export const firebaseRef = Firebase.initializeApp(config);
