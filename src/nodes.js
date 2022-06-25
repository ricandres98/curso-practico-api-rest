//Sections
const headerSection = document.querySelector('#header');
const trendingPreviewSection = document.querySelector('#trendingPreview');
const categoriesPreviewSection = document.querySelector('#categoriesPreview');
const genericListSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');
const likedMoviesSection = document.querySelector('#liked');

//Lists & Containers 
const searchForm = document.querySelector('#searchForm');
const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
const likedMoviesPreviewList = document.querySelector('.liked-movieList');
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');

//Elements
const headerTitle = document.querySelector('.header-title');
const languageSelector = document.querySelector('#languageInput');
const languageOptions = [...document.querySelectorAll('option')];
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');
const trendingPreviewTitle = document.querySelector('h2.trendingPreview-title');
const likedTitle = document.querySelector('h2.liked-title');
const categoriesPreviewTitle = document.querySelector('h2.categoriesPreview-title');
const relatedMoviesTitle = document.querySelector('h2.relatedMovies-title');

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchForm button');

const trendingBtn = document.querySelector('.trendingPreview-btn');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');
const movieDetailCategoriesList = document.querySelector('.movieDetail-container .categories-list');