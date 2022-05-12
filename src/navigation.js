searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=';
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});
arrowBtn.addEventListener('click', () => {
    location.hash = '#home';
});


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
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('header-arrow--white');
    arrowBtn.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewList.classList.remove('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    
    getTrendingMoviesPreview();
    getCategoriesPreview();
}
function trendsPage() {
    console.log('Trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewList.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

}
function searchPage() {
    console.log('Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewList.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}
function categoryPage() {
    console.log('categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewList.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    let url = location.hash.split('=');
    let [id, categoryName] = url[1].split('-')
    
    console.log(categoryName);
    categoryName = categoryName.replace('%20', ' ')
    console.log(categoryName);

    headerCategoryTitle.innerText = categoryName;

    getMoviesByCategories(id);
}
function movieDetailsPage() {
    console.log('Movie!!');

    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewList.classList.add('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}
