import axios from "axios";
import { language } from "./languages";
import { 
    headerSection,
    genericListSection,
    likedMoviesSection,
    trendingMoviesPreviewList,
    likedMoviesPreviewList,
    categoriesPreviewList,
    relatedMoviesContainer,
    movieDetailTitle,
    movieDetailDescription,
    movieDetailScore,
    movieDetailCategoriesList,
    movieDetailImage,
} from "./nodes.js";

import { startPage } from './navigation';

// Data

const API_KEY = process.env.API_KEY;

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': language
    }
});

const IMAGE_URL_300 = 'https://image.tmdb.org/t/p/w300';
const IMAGE_URL_500 = 'https://image.tmdb.org/t/p/w500';

let maxPage ;
let page = startPage;

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if(item) {
        movies = item;
    } else {
        movies = {};
    }

    return movies;
}

function likeMovie(movie) {
    //movie.id
    const likedMovies = likedMoviesList();
    console.log(likedMoviesList())

    if (likedMovies[movie.id]) {
        console.log('ya está, borrala');
        delete likedMovies[movie.id];
    } else {
        console.log('no está, agregala');
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));

    if(location.hash== '') getLikedMovies();
    getTrendingMoviesPreview();
}


// Utils

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
        
    });
});

export const readURL = () => {
    const params = {};

    // location.hash: category=36-History?page=1&valor2=num2&valor3=num3
    // ['category=36-History', 'page=1&valor2=num2&valor3=num3']
    const [ hash, queryParams] = location.hash.split('?');
    let [ , query ] = hash.split('='); // ['category', '36-History']
    query = query.replaceAll('%20', ' ');
    // ['page=1', 'valor2=num2', 'valor3=num3']
    const queryParamsArray = queryParams ? queryParams.split('&') : [];
    
    queryParamsArray.forEach((param) => {
        const [ paramName, paramValue ] = param.split('=');
        params[paramName] = paramValue;
    });
    // params: {
    //     page: 2,
    //     valor2: algo,
    //     valor3: algo,
    // }

    let { page } = params;
    page = page ? parseInt(page) : 1;

    return {
        hash,
        page,
        params,
        query,
    };
}

export function printMovieCards(
    movies,
    fatherContainer,
    {
        lazyLoad = false, 
        clean = true
    } = {},
) {
    if(clean) {
        fatherContainer.innerHTML = '';
    }

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
            lazyLoad ? 'data-img' : 'src',
            `${IMAGE_URL_300}${movie.poster_path}`
        );

        movieImg.addEventListener('error', () => {
            movieImg.src = `http://placehold.jp/20/5C218A/EEEAF2/150x225.jpg?text=${movie.title}`;
        })

        const movieBtn = document.createElement('btn');
        movieBtn.classList.add('movie-btn');

        likedMoviesList()[movie.id]
        ? movieBtn.classList.add('movie-btn--liked')
        : movieBtn.classList.remove('movie-btn--liked');
        

        movieBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
        });
        
        if(lazyLoad) {
            lazyLoader.observe(movieImg);
        }
        
        
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        fatherContainer.appendChild(movieContainer);
    });
}

export function printCategories(categories, container){
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

export async function getTrendingMoviesPreview() {
    const { data } = await api('/trending/movie/day');

    const movies = data.results;

    printMovieCards(movies, trendingMoviesPreviewList, {lazyLoad: true});
}

export async function getCategoriesPreview() {
    const { data } = await api(`/genre/movie/list`);
    
    const categories = data.genres;

    printCategories(categories, categoriesPreviewList);
}

export async function getMoviesByCategories(id) {
    const { data } = await api(`/discover/movie`, {
        params: {
            'with_genres': id,
        },
    });

    const movies = data.results;
    maxPage = data.total_pages;

    printMovieCards(movies, genericListSection, {lazyLoad: true});
}

export function getPaginatedMoviesByCategories(id) {
    return async function() {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        
        const scrollIsBottom = (scrollTop + clientHeight >= scrollHeight - 10);
        
        const pageIsNotMax = page < maxPage;

        if (scrollIsBottom && pageIsNotMax) {
            page++;

            const { data } = await api(`/discover/movie`, {
                params: {
                    'with_genres': id,
                    page: page,
                },
            });
            
            const movies = data.results;

            printMovieCards(
                movies, 
                genericListSection, 
                {
                    lazyLoad: true,
                    clean: false,
                }
            );
        }
    }
}

export async function getMoviesBySearch(query) {
    const { data } = await api(`/search/movie`, {
        params: {
            query,
        },
    });
    console.log(data)

    const movies = data.results;
    maxPage = data.total_pages;

    printMovieCards(movies, genericListSection, true);
}

export function getPaginatedMoviesBySearch(query) {
    
    return async function() {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        
        const scrollIsBottom = (scrollTop + clientHeight >= scrollHeight - 10);
    
        const pageIsNotMax = page < maxPage;
        
        if(scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api(`/search/movie`, {
                params: {
                    query,
                    page,
                },
            });
        
            const movies = data.results;
            console.log(movies)
            console.log('page: ', page);
        
            printMovieCards(
                movies, 
                genericListSection, 
                { lazyLoad: true, clean: false }
            );    
        }
    }
}

export async function getTrendingMovies() {
    const { data } = await api('/trending/movie/day');

    const movies = data.results;
    console.log(movies);
    maxPage = data.total_pages;

    printMovieCards(movies, genericListSection, true);
}

export async function getPaginatedTrendingMovies() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight >= scrollHeight - 10);

    const pageIsNotMax = page < maxPage;
    
    if(scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('/trending/movie/day', {
            params: {
                page,
            },
        });
    
        const movies = data.results;
        console.log(movies)
        console.log('page: ', page);
    
        printMovieCards(
            movies, 
            genericListSection, 
            { lazyLoad: true, clean: false }
        );    
    }
}

export async function getMovieById(id) {
    const { data: movie } = await api(`/movie/${id}`);

    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), top/cover url(${IMAGE_URL_500}${movie.poster_path})`;
    movieDetailImage.src = `${IMAGE_URL_500}${movie.poster_path}`;
    movieDetailImage.alt = `${movie.title} poster`;

    console.log(movie);
    movieDetailTitle.innerHTML = movie.title;
    movieDetailDescription.innerHTML = movie.overview;
    movieDetailScore.innerHTML = movie.vote_average;
    
    printCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(id);
}

export async function getRelatedMoviesById(id) {
    const { data } = await api(`/movie/${id}/similar`);
    const relatedMovies = data.results;

    printMovieCards(relatedMovies, relatedMoviesContainer, true);
    relatedMoviesContainer.scrollTo(0, 0);
}

export function getLikedMovies() {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    printMovieCards(moviesArray, likedMoviesPreviewList, {lazyLoad: true});
    
    (likedMoviesPreviewList.innerHTML === '')
    ? likedMoviesSection.classList.add('inactive') 
    : likedMoviesSection.classList.remove('inactive');

    console.log(moviesArray);
}

// Build Loading skeletons

export function buildMovieCardSkeletons({container, numOfSkeletons}) {
    container.innerHTML = "";
    
    const fragment = new DocumentFragment();

    for(let i = 0; i < numOfSkeletons; i++) {
        const skeleton = document.createElement('div');
        skeleton.classList.add('movie-container');
        skeleton.classList.add('movie-container--loading');

        fragment.appendChild(skeleton);
    }

    container.appendChild(fragment);
}

export function buildCategorySkeletons({container, numOfSkeletons}) {
    container.innerHTML = "";

    const fragment = new DocumentFragment();

    for(let i = 0; i < numOfSkeletons; i++) {
        const skeleton = document.createElement('div');
        skeleton.classList.add('category-container');
        skeleton.classList.add('category-container--loading');

        fragment.appendChild(skeleton);
    }

    container.appendChild(fragment);
}

export function buildMovieDetailSkeletons(){
    movieDetailTitle.innerHTML = '<span class="loading"></span>';
    movieDetailDescription.innerHTML = `<span class="loading"></span>
    <span class="loading"></span>
    <span class="loading"></span>`;
    movieDetailScore.innerHTML = '<span class="loading"></span>';
}

// import { readURL } from './main.js';
// import { getCategoriesPreview } from './main.js';
// import { getMoviesByCategories } from './main.js';
// import { getPaginatedMoviesByCategories } from './main.js';
// import { getMoviesBySearch } from './main.js';
// import { getPaginatedMoviesBySearch } from './main.js';
// import { getTrendingMovies } from './main.js';
// import { getPaginatedTrendingMovies } from './main.js';
// import { getMovieById } from './main.js';
// import { buildMovieCardSkeletons } from './main.js';
// import { buildCategorySkeletons } from './main.js';
// import { buildMovieDetailSkeletons } from './main.js';
