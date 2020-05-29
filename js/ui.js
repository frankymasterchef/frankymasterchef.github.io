const recipes= document.querySelector('.recipes');

//render recipe

const renderRecipe = (data, id) => {
    // const html =`<div class=col-lg-4 col-md-6 mb-4" data-id="${id}"><div class="post-entry-1 h-100"><h2><a href="detail_recipe.html">${data.title}</a></h2><p>${data.Ingridients}</p>`;
    const html =`<div class='recipe col-lg-4 col-md-6 mb-4' data-id="${id}"><div class='post-entry-1 h-100'><a href='detail_recipe.html?id="${id}"'><img src="${data.image}" alt='Image' class='img-fluid'></a><div class='post-entry-1-contents'><h2><a class='rec' href='detail_recipe.html?id="${id}"'>${data.title}</a></h2><span class='meta d-inline-block mb-3'>${data.date}</span><br><p>${data.short_desc}</p><div class='text-center'><i class="icon-trash" data-id="${id}"></i></div></div></div></div>`;
    recipes.innerHTML += html;
};

//remove recipe from DOM
const removeRecipe = (id) => {
    const recipe= document.querySelector(`.recipe[data-id=${id}]`);
    recipe.remove();
}; 