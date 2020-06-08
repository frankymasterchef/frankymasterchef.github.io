function config_file() {
  var firebaseConfig = {
    apiKey: "AIzaSyAqpcoHIGs83TRnEcaqj951G553KjgegMk",
    authDomain: "webchefpad-1e9bd.firebaseapp.com",
    databaseURL: "https://webchefpad-1e9bd.firebaseio.com",
    projectId: "webchefpad-1e9bd",
    storageBucket: "webchefpad-1e9bd.appspot.com",
    messagingSenderId: "619894914509",
    appId: "1:619894914509:web:cd2ac538a0558d20431884"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.LOCAL;
}

function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successfull.
    // firebase.firestore().clearPersistence()
    // .then(function() {
    //   alert("peristence clear");
    document.getElementById("logout").innerHTML = "";
    window.location.href = "/account.html";
    //  })
    //  .catch(error => {
    //   console.error('Could not enable persistence:', error.code);
    // })

  }).catch(function(error) {
    alert("failed logout");
  })
}

function check_signin() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("logout").innerHTML = '<a href="" onclick="logout()" class="nav-link">Logout</a>'
      console.log(user);
    } else {}
  })
}
