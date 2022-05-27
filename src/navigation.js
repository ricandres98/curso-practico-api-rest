// document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('form').addEventListener('submit', (event)=> {
        console.log(event)
        event.preventDefault();
    }, false);
// })
searchFormBtn.addEventListener('click', () => {
    const input = searchFormInput.value.trim();
    location.hash = `#search=${searchFormInput.value.trim()}`;
});
searchFormInput.addEventListener('keyup', (event) => {
    console.log(event);
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


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
function navigator() {
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
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    buildMovieCardSkeletons({
        container: genericListSection,
        numOfSkeletons: 4});

    getTrendingMovies();
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
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');


    // ['#search', 'valor']
    let [ , query]= location.hash.split('=');

    buildMovieCardSkeletons({
        container: genericListSection,
        numOfSkeletons: 4});

    getMoviesBySearch(query);
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
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    let url = location.hash.split('=');
    let [id, categoryName] = url[1].split('-');
    
    console.log(categoryName);
    categoryName = categoryName.replace('%20', ' ')
    console.log(categoryName);

    headerCategoryTitle.innerText = categoryName;

    buildMovieCardSkeletons({
        container: genericListSection,
        numOfSkeletons: 4});

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
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // ['#search', 'valor']
    let [ , movieId]= location.hash.split('=');

    buildMovieCardSkeletons({container: relatedMoviesContainer, numOfSkeletons: 4});

    buildCategorySkeletons({container: movieDetailCategoriesList, numOfSkeletons: 4});
    
    buildMovieDetailSkeletons();

    getMovieById(movieId);
}