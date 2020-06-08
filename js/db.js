db = firebase.firestore();
var selectedFile;
// $( document ).ready(function() {
// 	document.getElementById("upload").addEventListener('change', handleFileSelect, false);
// });
//offline data
db.enablePersistence()
  .catch(err => {
    if (err.code == 'failed-precondition') {
      console.log('presistence failed');
    } else if (err.code == 'unimplemented') {
      console.log('presistence is not available');
    }
  })
//real-time listener
var path = window.location.pathname;
if (path == "/myrecipe.html") {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("UID:" + firebase.auth().currentUser.uid);
      db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').onSnapshot((snapshot) => {
        // console.log(snapshot.docChanges());
        snapshot.docChanges().forEach((change => {
          // console.log(change, change.doc.data(), change.doc.id);
          if (change.type === 'added') {
            renderRecipe(change.doc.data(), change.doc.id);
            // console.log("doc-data:" + change.doc.data().title);
            // console.log("doc-id:" + change.doc.id);
          }
          if (change.type === 'removed') {
            removeRecipe(change.doc.id);
          }
        }))
      })
    }
  })
}
// get detail data my recipe
if (path == "/detail_myrecipe.html") {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("UID:" + firebase.auth().currentUser.uid);
      db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').onSnapshot((snapshot) => {
        // console.log(snapshot.docChanges());
        snapshot.docChanges().forEach((change => {
          // console.log(change, change.doc.data(), change.doc.id);
          if (change.type === 'added') {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const ID = urlParams.get('id')
            if (change.doc.id === (ID).substring(1, ID.length - 1)) {
              renderdetailrecipe(change.doc.data(), change.doc.id);
              // console.log("doc-data:" + change.doc.data().title);
              // console.log("doc-id:" + change.doc.id);
            }

          }

        }))
      })

    }
  })
}





let file = {};
let url_image = "";

function chooseFile(e) {
  file = e.target.files[0];
}



// add new recipe
if (path == "/create_recipe.html") {
  const form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    temp_ingreds = form.Ingredients.value.replace(/\r?\n/g, '<br />');
    temp_steps = form.Steps.value.replace(/\r?\n/g, '<br />');
    temp_tips = form.Tips.value.replace(/\r?\n/g, '<br />');
    var today = new Date();
    var convert_month = month[today.getMonth()];
    var full_date = convert_month + ' ' + today.getDate() + ', ' + today.getFullYear();
    console.log("NAME:" + file.name);
    document.getElementById("imageResult").innerHTML = file;
    firebase.storage().ref('recipes/' + file.name).put(file).then(function() {
      console.log("success upload");
      firebase.storage().ref('recipes/' + file.name).getDownloadURL().then(imgURL => {
        const recipe = {
          title: form.title.value,
          short_desc: form.short_desc.value,
          ingredients: temp_ingreds,
          steps: temp_steps,
          tips: temp_tips,
          image: imgURL,
          date: full_date
        };
        console.log("UID:" + firebase.auth().currentUser.uid);
        db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').add(recipe)
          .then(function() {
            location.reload();
          })
          .catch(err => console.log(err));
        // location.reload();
        // form.title.value='';
        // form.short_desc.value='';
        // form.Ingredients.value='';
        // form.Steps.value='';
        // form.Tips.value='';
        // document.getElementById("pic_area").innerHTML = "";
        // document.getElementById("upload-label").innerHTML = "";
      })
    }).catch(error => {
      console.log(error.message);
    })




  });


}

//delete recipe
if (path == "/myrecipe.html") {
  const recipeContainer = document.querySelector('.recipes');
  recipeContainer.addEventListener('click', event => {
    //console.log(event);
    if (event.target.tagName === 'I') {
      const id = event.target.getAttribute('data-id');
      db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').doc(id).delete();
    }
  });
}


//get detail data my recipe before edit and edited
if (path == "/edit_myrecipe.html") {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {


      console.log("UID:" + firebase.auth().currentUser.uid);
      db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').onSnapshot((snapshot) => {
        // console.log(snapshot.docChanges());
        snapshot.docChanges().forEach((change => {
          // console.log(change, change.doc.data(), change.doc.id);
          if (change.type === 'added') {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const ID = urlParams.get('id')
            if (change.doc.id === (ID).substring(1, ID.length - 1)) {
              rendereditedRecipe(change.doc.data(), change.doc.id);

              const form = document.querySelector('form');
              form.addEventListener('submit', event => {
                event.preventDefault();

                var month = new Array();
                month[0] = "January";
                month[1] = "February";
                month[2] = "March";
                month[3] = "April";
                month[4] = "May";
                month[5] = "June";
                month[6] = "July";
                month[7] = "August";
                month[8] = "September";
                month[9] = "October";
                month[10] = "November";
                month[11] = "December";

                var today = new Date();
                var convert_month = month[today.getMonth()];
                var full_date = convert_month + ' ' + today.getDate() + ', ' + today.getFullYear();

                temp_ingreds = form.Ingredients.value.replace(/\r?\n/g, '<br />');
                temp_steps = form.Steps.value.replace(/\r?\n/g, '<br />');
                temp_tips = form.Tips.value.replace(/\r?\n/g, '<br />');

                console.log("FILE:" + file);

                //cek kalo user mau update gambar baru atau tidak
                if (file.name != undefined) {
                  console.log("NAME:" + file.name);
                  document.getElementById("imageResult").innerHTML = file;
                  document.getElementById("upload-label").innerHTML = file.name;
                  firebase.storage().ref('recipes/' + file.name).put(file).then(function() {
                    console.log("success upload");
                    firebase.storage().ref('recipes/' + file.name).getDownloadURL().then(imgURL => {

                      const recipe_ = {
                        title: form.title.value,
                        short_desc: form.short_desc.value,
                        ingredients: temp_ingreds,
                        steps: temp_steps,
                        tips: temp_tips,
                        image: imgURL,
                        date: full_date
                      };


                      db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').doc(change.doc.id).set(recipe_)
                        .then(function() {
                          location.reload();
                        })
                        .catch(err => console.log(err));


                    })
                  }).catch(error => {
                    console.log(error.message);
                  })
                } else {
                  const recipe_ = {
                    title: form.title.value,
                    short_desc: form.short_desc.value,
                    ingredients: temp_ingreds,
                    steps: temp_steps,
                    tips: temp_tips,
                    image: change.doc.data().image,
                    date: full_date
                  };


                  db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').doc(change.doc.id).set(recipe_)
                    .then(function() {
                      location.reload();
                    })
                    .catch(err => console.log(err));


                }



              });



            }

          }

        }))
      })






    }
  })
}
