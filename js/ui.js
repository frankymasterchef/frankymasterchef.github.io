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

const recipes_detail= document.querySelector('.detail');
const renderdetailrecipe = (data,id) =>{
    const html_ = `
    <div class="ftco-blocks-cover-1">
    <div class="site-section-cover bg-image overlay"  style="background-image: url('images/explore_cover.jpg')">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-7" id="cover_detail">
           <span class='d-block mb-3 text-white' data-aos='fade-up'>${data.date}<span class='mx-2 text-primary'>&bullet;</span>by "Me"</span><h1 class='mb-4' data-aos='fade-up' data-aos-delay='100'>${data.title}</h1>"
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

                 
                   "<a href="${data.image}" data-fancybox='gal'><img src="${data.image}" alt='Image' class='img-fluid'></a>"

                
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
                <span class='mx-2 text-primary'>&bullet;</span>${data.tips}<br><br>
              </div>
         </div>
        </div>
        
      </div>
    </div>
  </div>

    `

    recipes_detail.innerHTML += html_;
};