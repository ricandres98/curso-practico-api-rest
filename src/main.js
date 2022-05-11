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
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function getTrendingMoviesPreview () {
    const { data } = await api('/trending/movie/day');

    const movies = data.results;
    console.log(movies)

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            `${IMAGE_URL}${movie.poster_path}`
        );
        // movieImg.alt = movie.title;
        // movieImg.src = `${IMAGE_URL}${movie.poster_path}`;
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);


    });
}
async function getCategoriesPreview() {
    const { data } = await api(`/genre/movie/list`);
    
    const categories = data.genres;
    console.log(categories);

    categories.forEach(category => {
        const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list')
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.innerText = category.name;
        // movieImg.alt = movie.title;
        // movieImg.src = `${IMAGE_URL}${movie.poster_path}`;
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);


    });
}

