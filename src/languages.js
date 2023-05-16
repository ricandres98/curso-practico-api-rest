import { 
    languageOptions, 
    languageSelector,
    trendingPreviewTitle,
    trendingBtn,
    likedTitle,
    categoriesPreviewTitle,
    relatedMoviesTitle,
    footerDoneByParagraph,
    footerApiCreditsParagraph
} from './nodes.js'

class Language {
    constructor(
        language,
        {
        trendingPreviewTitle,
        trendingBtn,
        likedTitle,
        categoriesPreviewTitle,
        relatedMoviesTitle,
        footerDoneByParagraph,
        footerApiCreditsParagraph
        }
    ) {
        this.language = language;
        
        this.trendingPreviewTitle = trendingPreviewTitle;
        this.trendingBtn = trendingBtn;
        this.likedTitle = likedTitle;
        this.categoriesPreviewTitle = categoriesPreviewTitle;
        this.relatedMoviesTitle = relatedMoviesTitle;
        this.footerDoneByParagraph = footerDoneByParagraph;
        this.footerApiCreditsParagraph = footerApiCreditsParagraph;
    }

    changeLanguage() {
        trendingPreviewTitle.innerText = this.trendingPreviewTitle;
        trendingBtn.innerText = this.trendingBtn;
        likedTitle.innerText = this.likedTitle;
        categoriesPreviewTitle.innerText = this.categoriesPreviewTitle;
        relatedMoviesTitle.innerText = this.relatedMoviesTitle;
        footerDoneByParagraph.innerHTML = this.footerDoneByParagraph;
        footerApiCreditsParagraph.innerHTML = this.footerApiCreditsParagraph;
    }
}

const languagesArray = [
    new Language('es', { 
        trendingPreviewTitle: 'Tendencias',
        trendingBtn: 'Ver más',
        likedTitle: 'Películas Favoritas',
        categoriesPreviewTitle: 'Categorías',
        relatedMoviesTitle: 'Películas similares',
        footerDoneByParagraph: 'Hecho en el curso práctico de consumo de API REST de Platzi por <a href="https://twitter.com/ricandres_98">@ricandres_98</a> con diseño del equipo de Platzi y guiado por <a href="https://twitter.com/fjuandc">@fjuandc</a>' ,
        footerApiCreditsParagraph: 'Esta aplicación es alimentada con datos a través de la api de <a href="https://www.themoviedb.org/">The movieDB</a>'
    }),
    new Language('en', { 
        trendingPreviewTitle: 'Trends',
        trendingBtn: 'More',
        likedTitle: 'Favorite Movies',
        categoriesPreviewTitle: 'Categories',
        relatedMoviesTitle: 'Related movies',
        footerDoneByParagraph: 'Done by <a href="https://twitter.com/ricandres_98">@ricandres_98</a> during the practical course of API REST consumption at Platzi, design made by Platzi team and with the guideness of <a href="https://twitter.com/fjuandc">@fjuandc</a>',
        footerApiCreditsParagraph: 'This application uses data that is fetched using the API from <a href="https://www.themoviedb.org/">The movieDB</a>'
    }),
];

export let language = localStorage.getItem('language') || navigator.language;
const [ languageCode, /**/ ] = language.split('-');

const [selectedLanguageOption] = languageOptions.filter(option => option.value.startsWith(languageCode));
selectedLanguageOption.selected = true;

window.addEventListener('load', () => {
    const [ languageCode, /**/ ] = language.split('-');
    const [ newLang ] = languagesArray.filter(item => item.language.startsWith(languageCode));
    newLang.changeLanguage();
})

languageSelector.addEventListener('change', () => {
    localStorage.setItem('language', languageSelector.value);
    language = languageSelector.value;
    window.location.reload();
});