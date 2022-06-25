class Language {
    constructor(
        language,
        {
        trendingPreviewTitle,
        trendingBtn,
        likedTitle,
        categoriesPreviewTitle,
        relatedMoviesTitle,
        }
    ) {
        this.language = language;
        
        this.trendingPreviewTitle = trendingPreviewTitle;
        this.trendingBtn = trendingBtn;
        this.likedTitle = likedTitle;
        this.categoriesPreviewTitle = categoriesPreviewTitle;
        this.relatedMoviesTitle = relatedMoviesTitle;
    }

    changeLanguage() {
        trendingPreviewTitle.innerText = this.trendingPreviewTitle;
        trendingBtn.innerText = this.trendingBtn;
        likedTitle.innerText = this.likedTitle;
        categoriesPreviewTitle.innerText = this.categoriesPreviewTitle;
        relatedMoviesTitle.innerText = this.relatedMoviesTitle;
    }
}

const languagesArray = [];
languagesArray.push(new Language('es', { 
    trendingPreviewTitle: 'Tendencias',
    trendingBtn: 'Ver más',
    likedTitle: 'Películas Favoritas',
    categoriesPreviewTitle: 'Categorías',
    relatedMoviesTitle: 'Películas similares',
}));
languagesArray.push(new Language('en', { 
    trendingPreviewTitle: 'Trends',
    trendingBtn: 'More',
    likedTitle: 'Favorite Movies',
    categoriesPreviewTitle: 'Categories',
    relatedMoviesTitle: 'Related movies',
}));

let language = localStorage.getItem('language') || navigator.language;
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