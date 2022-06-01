//Sections
const headerSection = document.querySelector('#header');
const trendingPreviewSection = document.querySelector('#trendingPreview');
const categoriesPreviewSection = document.querySelector('#categoriesPreview');
const genericListSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');
const buttonPanelSection = document.querySelector('#buttonPanel');

//Lists & Containers 
const searchForm = document.querySelector('#searchForm');
const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');

//Elements
const headerTitle = document.querySelector('.header-title');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchForm button');

const trendingBtn = document.querySelector('.trendingPreview-btn');

const priorBtn = document.querySelector('.buttonPanel-container .button--priorPage');
const nextBtn = document.querySelector('.buttonPanel-container .button--nextPage');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');
const movieDetailCategoriesList = document.querySelector('.movieDetail-container .categories-list');