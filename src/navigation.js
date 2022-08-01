import {
    headerSection,
    trendingPreviewSection,
    categoriesPreviewSection,
    genericListSection,
    movieDetailSection,
    likedMoviesSection,
    searchForm,
    trendingMoviesPreviewList,
    likedMoviesPreviewList,
    categoriesPreviewList,
    relatedMoviesContainer,
    headerTitle,
    arrowBtn,
    headerCategoryTitle,
    searchFormInput,
    searchFormBtn,
    trendingBtn,
    movieDetailCategoriesList 
} from './nodes.js';

import {
    readURL,
    getCategoriesPreview,
    getTrendingMoviesPreview,
    getLikedMovies,
    getMoviesByCategories, 
    getPaginatedMoviesByCategories, 
    getMoviesBySearch, 
    getPaginatedMoviesBySearch, 
    getTrendingMovies, 
    getPaginatedTrendingMovies, 
    getMovieById, 
    buildMovieCardSkeletons, 
    buildCategorySkeletons, 
    buildMovieDetailSkeletons 
} from './main.js';


export let prueba = 1;
export let startPage = 1;
let infiniteScroll;

// document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('form#searchForm').addEventListener('submit', (event)=> {
        console.log(event)
        event.preventDefault();
    }, false);
// })
searchFormBtn.addEventListener('click', () => {
    const input = searchFormInput.value.trim();
    location.hash = `#search=${searchFormInput.value.trim()}`;
});
searchFormInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        const input = searchFormInput.value.trim();
        location.hash = `#search=${searchFormInput.value.trim()}`;
    }
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});
arrowBtn.addEventListener('click', () => {
    // location.hash = '#home';
    history.back();
});


window.addEventListener('DOMContentLoaded', pageNavigator, false);
window.addEventListener('hashchange', pageNavigator, false);
// window.addEventListener('scroll', infiniteScroll, { passive: false });


function pageNavigator() {
    if(infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }
    
    startPage = 1;

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
    
    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;


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
    likedMoviesSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    

    //Loading skeletons
    buildMovieCardSkeletons({
        container: trendingMoviesPreviewList,
        numOfSkeletons: 3});

    buildCategorySkeletons({
        container: categoriesPreviewList,
        numOfSkeletons: 4});
    
    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();

    (likedMoviesPreviewList.innerHTML === '')
    ? likedMoviesSection.classList.add('inactive') 
    : likedMoviesSection.classList.remove('inactive');
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
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    buildMovieCardSkeletons({
        container: genericListSection,
        numOfSkeletons: 4});

    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}

function searchPage() {
    console.log('Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');


    // ['#search', 'valor']
    let { query }= readURL();

    buildMovieCardSkeletons({
        container: genericListSection,
        numOfSkeletons: 4});

    getMoviesBySearch(query);

    infiniteScroll = getPaginatedMoviesBySearch(query)
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
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    let url = location.hash.split('=');
    let [id, categoryName] = url[1].split('-');
    
    console.log(categoryName);
    categoryName = decodeURI(categoryName);
    console.log(categoryName);

    headerCategoryTitle.innerText = categoryName;

    buildMovieCardSkeletons({
        container: genericListSection,
        numOfSkeletons: 4});

    getMoviesByCategories(id);

    infiniteScroll = getPaginatedMoviesByCategories(id);
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
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // ['#search', valor]
    let [ , valor]= location.hash.split('=');
    // [ movieId, movieName ]
    let [ movieId, ] = valor.split('-');

    buildMovieCardSkeletons({container: relatedMoviesContainer, numOfSkeletons: 4});
    buildCategorySkeletons({container: movieDetailCategoriesList, numOfSkeletons: 4});
    buildMovieDetailSkeletons();

    getMovieById(movieId);
}