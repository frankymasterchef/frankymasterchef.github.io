const recipes= document.querySelector('.recipes');

//render recipe

const renderRecipe = (data, id) => {
    // const html =`<div class=col-lg-4 col-md-6 mb-4" data-id="${id}"><div class="post-entry-1 h-100"><h2><a href="detail_recipe.html">${data.title}</a></h2><p>${data.Ingridients}</p>`;
    const html =`<div class='recipe col-lg-4 col-md-6 mb-4' data-id="${id}"><div class='post-entry-1 h-100'><a href='detail_myrecipe.html?id="${id}"'><img src="${data.image}" alt='Image' class='img-fluid'></a><div class='post-entry-1-contents'><h2><a class='rec' href='detail_myrecipe.html?id="${id}"'>${data.title}</a></h2><span class='meta d-inline-block mb-3'>${data.date}</span><br><p>${data.short_desc}</p><div class='text-center'><i class="icon-trash" data-id="${id}"></i></div></div></div></div>`;
    recipes.innerHTML += html;
};

//remove recipe from DOM
const removeRecipe = (id) => {
    console.log("delete:" + `${id}`);
    const recipe= document.querySelector(`.recipe[data-id=${id}]`);
    recipe.remove();
};


//page detail myrecipe
const recipes_detail= document.querySelector('.detail');
const renderdetailrecipe = (data,id) =>{

    const html_ = `
    <div class="ftco-blocks-cover-1">
    <div class="site-section-cover bg-image overlay"  style="background-image: url('https://firebasestorage.googleapis.com/v0/b/webchefpad-1e9bd.appspot.com/o/static%2Fexplore_cover.webp?alt=media&token=5f76d7d5-0ad3-413e-b7de-72f1bd4edcc9')">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-7" id="cover_detail">
           <span class='d-block mb-3 text-white' data-aos='fade-up'>${data.date}<span class='mx-2 text-primary'>&bullet;</span>by Me</span><h1 class='mb-4' data-aos='fade-up' data-aos-delay='100'>${data.title}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="site-section">
    <div class="container">
      <div class="row">
         <div class="col-md-12 mb-4">
            <div class="row">
             <div class="col-md-8 mb-4 mt-md-5">
                <div class="d-flex align-items-center" id="image_recipe_detail">
                   <a href=${data.image} data-fancybox='gal'><img src=${data.image} alt='Image' class='img-fluid'></a>
                </div>
              </div>
              <div class="col-md-4 mt-md-5 sidebar">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="v-pills-Ingredients-tab" data-toggle="pill" href="#v-pills-Ingredients" role="tab" aria-controls="v-pills-Ingredients" aria-selected="true">Ingredients</a>
                    <a class="nav-link" id="v-pills-Step-tab" data-toggle="pill" href="#v-pills-Step" role="tab" aria-controls="v-pills-Step" aria-selected="false">Steps</a>
                     <a class="nav-link" id="v-pills-Tips-tab" data-toggle="pill" href="#v-pills-Tips" role="tab" aria-controls="v-pills-Tips" aria-selected="false">Tips</a>
                  </div>
              </div>
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 blog-content">
          <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-Ingredients" role="tabpanel" aria-labelledby="v-pills-Ingredients-tab">
                 ${data.ingredients}<br>
              </div>
              <div class="tab-pane fade" id="v-pills-Step" role="tabpanel" aria-labelledby="v-pills-Step-tab">
               ${data.steps}<br><br>
              </div>
              <div class="tab-pane fade" id="v-pills-Tips" role="tabpanel" aria-labelledby="v-pills-Tips-tab">
                ${data.tips}<br><br>
              </div>
         </div>
        </div>
        <div class="col-md-2 sidebar">
            <div class="sidebar-box" id="edited_button">
             <a class="btn btn-primary text-white py-3 px-5" role ="button" href='edit_myrecipe.html?id="${id}"'><i class="icon-edit" href='edit_myrecipe.html?id="${id}"'></i></a>
            </div>
          </div>
      </div>
    </div>
  </div>
    `
    recipes_detail.innerHTML += html_;
};
//page edit myrecipe
const edited= document.querySelector('.edit');
const rendereditedRecipe = (data, id) => {
  const ingreds= data.ingredients.replace(/<br\s*[\/]?>/gi, "\n");
  const steps= data.steps.replace(/<br\s*[\/]?>/gi, "\n");
  const tips= data.tips.replace(/<br\s*[\/]?>/gi, "\n");
  const html2 =`
    <div class="site-section">
    <div class="text-center">
      <h2 class="heading-border-bottom font-weight-bold serif text-black mb-5 text-center">Edit Your Recipe</h2>
    </div>
    <div class="site-section bg-image overlay features_75651" style="background-image: url('https://firebasestorage.googleapis.com/v0/b/webchefpad-1e9bd.appspot.com/o/static%2Fcreate_bg2.webp?alt=media&token=e38ffc37-4274-43cd-8257-d04db1b34700')">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mt-md-5 sidebar mb-4">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a class="nav-link active" id="v-pills-Ingredients-tab" data-toggle="pill" href="#v-pills-Ingredients" role="tab" aria-controls="v-pills-Ingredients" aria-selected="true">Ingredients</a>
              <a class="nav-link" id="v-pills-Step-tab" data-toggle="pill" href="#v-pills-Step" role="tab" aria-controls="v-pills-Step" aria-selected="false">Steps</a>
              <a class="nav-link" id="v-pills-Tips-tab" data-toggle="pill" href="#v-pills-Tips" role="tab" aria-controls="v-pills-Tips" aria-selected="false">Tips</a>
            </div>
          </div>
          <div class="col-lg-8 mb-5 mt-md-5">
            <form class="edit-recipe">
              <div class="form-group row">
                <div class="col-md-10">
                  <input type="text" class="form-control" placeholder="Title" id="title" value="${data.title}" required>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-10">
                  <input type="text" class="form-control" placeholder="Short Description" id="short_desc" value="${data.short_desc}" required>
                </div>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-Ingredients" role="tabpanel" aria-labelledby="v-pills-Ingredients-tab">
                  <div class="form-group row">
                    <div class="col-md-10 mb-4">
                      <textarea name="" id="Ingredients" class="form-control" placeholder="Write Ingredients" cols="30" rows="10" required>${ingreds}</textarea>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="v-pills-Step" role="tabpanel" aria-labelledby="v-pills-Step-tab">
                  <div class="form-group row">
                    <div class="col-md-10 mb-4">
                      <textarea name="" id="Steps" class="form-control" placeholder="Write Steps" cols="30" rows="10" required>${steps}</textarea>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="v-pills-Tips" role="tabpanel" aria-labelledby="v-pills-Tips-tab">
                  <div class="form-group row">
                    <div class="col-md-10 mb-4">
                      <textarea name="" id="Tips" class="form-control" placeholder="Write Tips" cols="30" rows="10" required>${tips}</textarea>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Upload image input-->
              <div class="form-group row">
                <div class="col-md-10 mb-4">
                  <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm mb-4">
                    <input id="upload" type="file" onchange="chooseFile(event)" class="form-control border-0">
                    <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose file</label>
                    <div class="input-group-append">
                      <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                    </div>
                  </div>
                  <div class="image-area mt-4 mb-4" id="pic_area"><img id="imageResult" src="${data.image}" alt="" class="img-fluid rounded shadow-sm mx-auto d-block"></div>
                  <div class="form-group row">
                    <div class="col-md-8 mr-auto ml-auto mb-4">
                      <input type="submit" class="btn btn-block btn-primary text-white py-3 px-5 upload-group" value="Submit">
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
  </div>

  `;
  edited.innerHTML += html2;




};
