import React, {useEffect} from 'react';
import './styles.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
//Laad nieuwste film voor de bovenkant
function FeaturedMovie( { movie, watchList, setWatchList } ) {

    // Voeg film aan watchList in react state
    const addToList = () => {
        // zet nieuwe array met films als nieuwe watchlist state
        if (watchList.filter(watchMovie => watchMovie.original_name === movie.original_name).length === 0) {
            setWatchList([...watchList, movie]);
        }
    };

    //Haalt Date uit Json die dan
  let firstDate = new Date(movie.first_air_date);

  //Maakt genres leeg omdat het niet van toepassing is
  let genres = [];


  for(let i in movie.genres){
    genres.push(movie.genres[i].name);
  }
  let description = movie.overview.length > 200 ? movie.overview.substring(0, 200) + '...' : movie.overview;

  return (
    <section 
        className="featured" 
        style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
    >
        <div className="featured--vertical">
            <div className="featured--horizontal">
                <div className="featured--name">{movie.original_name}</div>
                
                <div className="featured--info">
                    <div className="featured--points">{movie.vote_average} points</div>
                    <div className="featured--year">{firstDate.getFullYear()}</div>
                    <div className="featured--seasons">{movie.number_of_seasons} temperature{movie.number_of_seasons !== 1 ? 's' : ''}</div>
                </div>

                <div className="featured--description">{description}</div>
                <div className="featured--buttons">
                    <a href="#" className="featured--watchbutton"><div><PlayArrowIcon /> Play</div></a>
                    <a href="#" onClick={addToList} className="featured--mylistbutton"><div><AddIcon />Add to list</div></a>
                </div>
                <div className="featured--genres"><strong>Genres:</strong> {genres.join(', ')}</div>
            </div>
        </div>
    </section>
  );
}

//Stuurd all data deeltjes van de feutured movie naar de detail pagina
export default FeaturedMovie;
