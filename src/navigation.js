//Evitar que al enviar el formulario este modifique la URL con su comportamiento default, 
// para así tener el control sobre esta.
document.querySelector('form').addEventListener('submit', (event)=> {
    console.log(event)
    event.preventDefault();
}, false);
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

//Pagination

nextBtn.addEventListener('click', () =>{
    
    // if(hash.startsWith('#category=') {

    // }
    // location.hash: category=36-History?page=3
    // ['category=36-History', 'page=3']
    const [ hash, pageQuery] = location.hash.split('?');
    
    let page = pageQuery ? parseInt(pageQuery.split('=')[1]) : 1;

    page += 1;

    location.hash = `${hash}?page=${page}`;
});

priorBtn.addEventListener('click', () => {
    // location.hash: category=36-History?page=3
    // ['category=36-History', 'page=3']
    const [ hash, pageQuery] = location.hash.split('?');
    // pageQuery.split('=') --> ['page', '3']
    let page = pageQuery ? parseInt(pageQuery.split('=')[1]) : undefined;

    if(page > 1) {
        page -= 1;
        location.hash = `${hash}?page=${page}`;
    } 
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
    buttonPanelSection.classList.add('inactive');
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
    buttonPanelSection.classList.add('inactive');
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
    buttonPanelSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');


    // ['#search', 'valor']
    // let [ , query]= location.hash.split('=');

    let { page, query } = readURL();

    buildMovieCardSkeletons({
        container: genericListSection,
        numOfSkeletons: 4});

    getMoviesBySearch({query, page});
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
    buttonPanelSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');


    const {hash, page} = readURL();

    // ['category', '36-History']
    const [ , categoryValue] = hash.split('=');

    // ['36', 'History']
    let [id, categoryName] = categoryValue.split('-');

    categoryName = categoryName.replace('%20', ' ');
  
    headerCategoryTitle.innerText = categoryName;

    buildMovieCardSkeletons({
        container: genericListSection,
        numOfSkeletons: 4});

    getMoviesByCategories({id, page});
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
    buttonPanelSection.classList.add('inactive');
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