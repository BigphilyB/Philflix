import React, { useEffect, useState } from 'react';
import Tmdb from '../../Tmdb';
import { useParams } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import TheatersIcon from '@material-ui/icons/Theaters';
import LanguageIcon from '@material-ui/icons/Language';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
// import iconAmazon from '../../assets/icon-amazon.png';
import iconNetflix from '../../assets/icon-netflix.png';
import './styles.css';
import { Link } from 'react-router-dom';
import { useStickyState } from '../../sticky-state';

function Details(){
    const { id, type } = useParams();

    const [movieDetails, setMovieDetails] = useState({});
    const [trailerVideo, setTrailerVideo] = useState([]);
    const [urlVideo, setUrlVideo] = useState();
    const [videoFullScreen, setVideoFullScreen] = useState(false);
    const [descriptionVideo, setDescriptionVideo] = useState();
    const [watchList, setWatchList] = useStickyState([], 'watchList');


    const addToList = () => {
        // zet nieuwe array met films als nieuwe watchlist state
        if (watchList.filter(watchMovie => watchMovie.original_name === movieDetails.original_name).length === 0) {
            setWatchList([...watchList, movieDetails]);
        }
        window.open('/');
    };
// pakt de juiste film van de database and vuld die data in bij de juiste variabelen
    useEffect(() => {
        const loadAll = async () => {
            let movie = await Tmdb.getMovieInfo(id, type);
            let trailer = await Tmdb.getTrailerVideo(id, type)
            setMovieDetails(movie);
            setTrailerVideo(trailer);
            setDescriptionVideo(movie.overview?.length > 120 ? movie.overview.substring(0, 120) + '...' : movie.overview);
            //console.log(movie)
        }
        loadAll();
    }, [id, type])
    // De trailer ophaal functie
    function handleShowTrailer(){
        const trailer = trailerVideo.results;
        if(trailer !== undefined && trailer.length > 0){
            const url = `https://youtube.com/embed/${trailer[0].key}?autoplay=1&controls=0&showinfo=0&autohide=1`;
            setUrlVideo(url);
        }
    }

    //Moet dit worden uitgelegd?
    function handleVideoFullScreen(){
        setVideoFullScreen(!videoFullScreen);
    }
    
    
    return (
        <main 
        
        //Hier word de IMG van de variable movieDetails gepakt
            className="details" 
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`
            }}
        >   
    
        <Link to="/" className="details--backbutton">Back</Link>
            <section> 
                <div>
                    <div className="details--info"
                    //The movie databse heeft een dingetje waar ze een gemiddelde pakkken van een 1 op 10 rating en dat dan X 10 doen + een procent,
                    //Ook word hier text opgehaald en neergezet
                    >
                        
                        <h3 className={movieDetails.vote_average > 5 ? 'positive' : 'negative'}>{movieDetails.vote_average * 10 + '%'}</h3>
                    </div>
                    
                    <h1>{movieDetails.original_title || movieDetails.original_name}</h1>

                    <h4>{descriptionVideo}
                    
                    </h4>
                    <div
                    //Hier de add to watchlist knop die die gewoon de addToList functie actieveerd
                    >  
                    </div>
                    <a onClick={addToList} className="details--addtolist"><div><AddIcon />Add to Watchlist</div></a>
                    {
                        (trailerVideo.results !== undefined && trailerVideo.results.length !== 0)
                        &&
                        <a onClick={() => handleShowTrailer()} className="details--viewtrailer"><div><TheatersIcon />trailer</div></a>
                    }
                     {
                        (movieDetails.homepage !== undefined && movieDetails.homepage !== '') && 
                            <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer" className="details--officialsite">
                                <div
                                //
                                >
                                    {/* {
                                        movieDetails.homepage.includes('netflix') ?
                                        <img alt="Netflix" src={iconNetflix} width="23"/> :
                                        movieDetails.homepage.includes('amazon') ?
                                        <img alt="Amazon" src={iconAmazon} width="23"/> :
                                        <LanguageIcon />
                                    } */}
                                
                                </div>
                            </a>
                     }
                </div>
            </section>
            
            {
                urlVideo !== undefined
                &&
                <aside className={videoFullScreen ? 'video--fullscreen' : ''}
                //Trailer kopje waar die functie in word handleVideoFullScreen uitgevoerd
                >
                    <div>
                        <button onClick={() => handleVideoFullScreen()}><AspectRatioIcon /></button>
                    </div>
                    <iframe frameBorder="0" height="100%" width="100%" title="1"
                        src={urlVideo}>
                    </iframe>
                </aside>
            }
        </main>
    )
}

export default Details;