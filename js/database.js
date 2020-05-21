function config_file(){
  var firebaseConfig = {
    apiKey: "AIzaSyA-RjuwpG9YqLpLF4jHCbFBu90aShrHW6o",
    authDomain: "webchefpad.firebaseapp.com",
    databaseURL: "https://webchefpad.firebaseio.com",
    projectId: "webchefpad",
    storageBucket: "webchefpad.appspot.com",
    messagingSenderId: "343550062893",
    appId: "1:343550062893:web:a49c72e9501c6d30fc23a4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.LOCAL;
}
