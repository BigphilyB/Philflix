import React from 'react';
import './styles.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
//Laad nieuwste film voor de bovenkant
function FeaturedMovie( { item, state, setState } ) {

    const addToList = () => {
        if(!state.hasOwnProperty("results")) {
            console.log("RESULTS EMPTY");
            state = {results: []}
        }
        state.results.push(item);
        setState(state);
    };

    //Haalt Date uit Json die dan
  let firstDate = new Date(item.first_air_date);

  //Maakt genres leeg omdat het niet van toepassing is
  let genres = [];


  for(let i in item.genres){
    genres.push(item.genres[i].name);
  }
  let description = item.overview.length > 200 ? item.overview.substring(0, 200) + '...' : item.overview;

  return (
    <section 
        className="featured" 
        style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}
    >
        <div className="featured--vertical">
            <div className="featured--horizontal">
                <div className="featured--name">{item.original_name}</div>
                
                <div className="featured--info">
                    <div className="featured--points">{item.vote_average} points</div>
                    <div className="featured--year">{firstDate.getFullYear()}</div>
                    <div className="featured--seasons">{item.number_of_seasons} temperature{item.number_of_seasons !== 1 ? 's' : ''}</div>
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
