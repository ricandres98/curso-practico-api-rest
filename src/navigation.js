window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search='))  {
        searchPage();
    } else if (location.hash.startsWith('#movie='))  {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category='))  {
        categoryPage();
    } else {
        homePage();
    }

    location.hash
}

function homePage() {
    console.log('Home');
    
    getTrendingMoviesPreview();
    getCategoriesPreview();
}
function searchPage() {
    console.log('Search!!');
}
function trendsPage() {
    console.log('Trends');
}
function categoryPage() {
    console.log('categories!!');
}
function movieDetailsPage() {
    console.log('Movie!!');
}
