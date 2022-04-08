
//HIER WORD DE API OPGEROEPEN
const API_KEY = 'b07d99cb0e7cbba9c64d7c9c6f826c78';
const API_BASE = 'https://api.themoviedb.org/3';

//Hier word het API JSON bestand gefetched
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}
// Hier worden de json bestanden naar alle index.js's van de verschilende modules
export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                type: 'tv',
                items: await basicFetch(`/discover/tv?with_network=213&language=en-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'recommended for you',
                type: 'tv',
                items: await basicFetch(`/trending/all/week?language=en-BR&api_key=${API_KEY}`)
            }, 
            {
                slug: 'toprated',
                title: 'Populair',
                type: 'movie',
                items: await basicFetch(`/movie/top_rated?language=en-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'action',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=28&language=en-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'comedy',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=35&language=en-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'horror',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=27&language=en-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=en-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'documentarys',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=99&language=en-BR&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=en-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=en-BR&api_key=${API_KEY}`);
                break;
                default: 
                    info = null;
                break;
            }
        }
        return info;
    },
    getTrailerVideo: async (movieId, type) => {
        let trailer = {};

        if(movieId){
            switch(type){
                case 'movie':
                    trailer = await basicFetch(`/movie/${movieId}/videos?language=en-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    trailer = await basicFetch(`/tv/${movieId}/videos?language=en-BR&api_key=${API_KEY}`);
                break;
                default: 
                    trailer = null;
                break;
            }
        }
        return trailer;
    },
}