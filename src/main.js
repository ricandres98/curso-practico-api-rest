const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});

const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL_300 = 'https://image.tmdb.org/t/p/w300';
const IMAGE_URL_500 = 'https://image.tmdb.org/t/p/w500';

// Utils

function printMovieCards(movies, fatherContainer) {
    fatherContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}-${movie.title}`
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            `${IMAGE_URL_300}${movie.poster_path}`
        );
        
        
        movieContainer.appendChild(movieImg);
        fatherContainer.appendChild(movieContainer);
    });
}

function printCategories(categories, container){
    container.innerHTML = '';

    categories.forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.innerText = category.name;
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })
        
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}
// Llamados a la API

async function getTrendingMoviesPreview() {
    const { data } = await api('/trending/movie/day');

    const movies = data.results;
    console.log(movies)

    printMovieCards(movies, trendingMoviesPreviewList)
}

async function getCategoriesPreview() {
    const { data } = await api(`/genre/movie/list`);
    
    const categories = data.genres;
    console.log(categories);

    printCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategories(id) {
    const { data } = await api(`/discover/movie`, {
        params: {
            'with_genres': id,
        },
    });

    const movies = data.results;

    printMovieCards(movies, genericListSection);
}

async function getMoviesBySearch(query) {
    const { data } = await api(`/search/movie`, {
        params: {
            query,
        },
    });
    console.log(data)

    const movies = data.results;

    printMovieCards(movies, genericListSection);
}

async function getTrendingMovies() {
    const { data } = await api('/trending/movie/day');

    const movies = data.results;
    console.log(movies)

    printMovieCards(movies, genericListSection);
}

async function getMovieById(id) {
    const { data: movie } = await api(`/movie/${id}`);

    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${IMAGE_URL_500}${movie.poster_path})`

    console.log(movie);
    movieDetailTitle.innerHTML = movie.title;
    movieDetailDescription.innerHTML = movie.overview;
    movieDetailScore.innerHTML = movie.vote_average;
    
    console.log(`${IMAGE_URL_500}${movie.poster_path}`)
    printCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`/movie/${id}/similar`);
    const relatedMovies = data.results;

    printMovieCards(relatedMovies, relatedMoviesContainer);
    relatedMoviesContainer.scrollTo(0, 0);
}