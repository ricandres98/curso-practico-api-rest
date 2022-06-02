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

const readURL = () => {
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

function printPageInfo(currentPage, totalPages) {
    currentPageSpan.innerHTML = currentPage;
    totalPagesSpan.innerHTML = totalPages;
}

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            // console.log(entry);
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }

    });
});

function printMovieCards(movies, fatherContainer, lazyLoad = false) {
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
            lazyLoad ? 'data-img' : 'src',
            `${IMAGE_URL_300}${movie.poster_path}`
        );

        movieImg.addEventListener('error', () => {
            movieImg.src = `http://placehold.jp/20/5C218A/EEEAF2/150x225.jpg?text=${movie.title}`;
        })


        if(lazyLoad) {
            lazyLoader.observe(movieImg);
        }


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

    printMovieCards(movies, trendingMoviesPreviewList, true);
}

async function getCategoriesPreview() {
    const { data } = await api(`/genre/movie/list`);

    const categories = data.genres;
    console.log(categories);

    printCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategories({id, page = 1}) {
    const { data } = await api(`/discover/movie`, {
        params: {
            'with_genres': id,
            'page': page,
        },
    });

    const movies = data.results;
    printPageInfo(page, data.total_pages);
    printMovieCards(movies, genericListSection, true);
}

async function getMoviesBySearch({query, page}) {
    console.table({query, page});
    const { data } = await api(`/search/movie`, {
        params: {
            query,
            page,
        },
    });
    console.log(data)

    const movies = data.results;
    
    printPageInfo(page, data.total_pages);
    printMovieCards(movies, genericListSection, true);
}

async function getTrendingMovies() {
    const { data } = await api('/trending/movie/day');

    const movies = data.results;
    console.log(movies)

    printMovieCards(movies, genericListSection, true);
}

async function getMovieById(id) {
    const { data: movie } = await api(`/movie/${id}`);

    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${IMAGE_URL_500}${movie.poster_path})`

    console.log(movie);
    movieDetailTitle.innerHTML = movie.title;
    movieDetailDescription.innerHTML = movie.overview;
    movieDetailScore.innerHTML = movie.vote_average;

    printCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`/movie/${id}/similar`);
    const relatedMovies = data.results;

    printMovieCards(relatedMovies, relatedMoviesContainer, true);
    relatedMoviesContainer.scrollTo(0, 0);
}

// Build Loading skeletons

function buildMovieCardSkeletons({container, numOfSkeletons}) {
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

function buildCategorySkeletons({container, numOfSkeletons}) {
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

function buildMovieDetailSkeletons(){
    movieDetailTitle.innerHTML = '<span class="loading"></span>';
    movieDetailDescription.innerHTML = `<span class="loading"></span>
    <span class="loading"></span>
    <span class="loading"></span>`;
    movieDetailScore.innerHTML = '<span class="loading"></span>';
}