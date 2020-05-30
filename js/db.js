var selectedFile;


// $( document ).ready(function() {
// 	document.getElementById("upload").addEventListener('change', handleFileSelect, false);
// });

//offline data
db.enablePersistence()
.catch(err => {
  if(err.code == 'failed-precondition'){
    console.log('presistence failed');
  }
  else if(err.code == 'unimplemented'){
    console.log('presistence is not available');
  }
})

//real-time listener
var path = window.location.pathname;
    if(path=="/myrecipe.html"){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          
       
      console.log("UID:"+ firebase.auth().currentUser.uid);
      db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').onSnapshot((snapshot) => {
          // console.log(snapshot.docChanges());
          snapshot.docChanges().forEach((change => {
            // console.log(change, change.doc.data(), change.doc.id);
            if(change.type === 'added'){
            
                  renderRecipe(change.doc.data(), change.doc.id);
                  // console.log("doc-data:" + change.doc.data().title);
                  // console.log("doc-id:" + change.doc.id);
               
            }
            if(change.type === 'removed'){
              removeRecipe(change.doc.id);
            }
          }))
        })

      }
    })

      //   db.collection("recipes").get().then(function(querySnapshot) {
      //     querySnapshot.forEach(function(doc) {
      //         // doc.data() is never undefined for query doc snapshots
      //         console.log(doc.id, " => ", doc.data());
      //         console.log(doc.id, " => ", doc.data().title);
      //     });
      // });


        // db.collection("recipes").where("capital", "==", true)
        // .get()
        // .then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //     });
        // })
        // .catch(function(error) {
        //     console.log("Error getting documents: ", error);
        // });
}




  // $("#file").on("change", function(event){
  //   selectedFile=event.target.files[0];
  // });

  // function uploadfile(){
  //   var filename = selectedFile.name;
  //   var storageRef =  firebase.storage().ref('/myrecipe/');
  //   var uploadTask = storageRef.put(selectedFile);

  //   uploadTask.on('state_changed', function(snapshot){

  //   }, function(error){

  //   },function(){

  //     var downloadURL = uploadTask.snapshot.downloadURL;
  //     console.log(downloadURL);

  //   });
  // }


  let file={};
  let url_image="";

  function chooseFile(e){
    file = e.target.files[0];
  }  



// add new recipe
if(path=="/create_recipe.html"){
  const form = document.querySelector('form');
  form.addEventListener('submit',event =>{
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
      var full_date = convert_month+' '+today.getDate()+', '+today.getFullYear();
    
      firebase.storage().ref('recipes/' + file.name).put(file).then(function(){
          console.log("success upload");
          firebase.storage().ref('recipes/' + file.name).getDownloadURL().then(imgURL => {
            const recipe = {
              title: form.title.value,
              short_desc: form.short_desc.value,
              ingredients: form.Ingredients.value,
              steps: form.Steps.value,
              tips: form.Tips.value,
              image: imgURL,
              date:full_date
            };
            console.log("UID:"+ firebase.auth().currentUser.uid);
            db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').add(recipe)
            .catch(err => console.log(err));
          
            form.title.value='';
            form.short_desc.value='';
            form.Ingredients.value='';
            form.Steps.value='';
            form.Tips.value='';
            document.getElementById("pic_area").innerHTML = "";
            document.getElementById("upload-label").innerHTML = "";
          
          })
      }).catch(error => {
          console.log(error.message);
      })




  });

}

  //delete recipe
  if(path=="/myrecipe.html"){
  const recipeContainer = document.querySelector('.recipes');
  recipeContainer.addEventListener('click', event => {
    //console.log(event);
    if(event.target.tagName === 'I'){
      const id = event.target.getAttribute('data-id');
      db.collection('recipes').doc(firebase.auth().currentUser.uid).collection('list_recipes').doc(id).delete();
    }
  });
}
