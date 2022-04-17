import React, { useState } from 'react';
import './styles.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';


//Maakts cells aan
function MovieRow( { title, items, type, addToWatchListEnabled = false } ) {

  const [scrollX, setScrollX] = useState(0);


  //Zorgt wervoor dat de X as veranderd zodat de row naar links gaat
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0){
        x = 0;  
    }
    setScrollX(x);
  }

  //Zorgt ervoor dat de X as veranderd zodat de row naar Rechts gaat
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.length > 0 ? items.length * 200 : 200;
    if((window.innerWidth - listW) > x){
        x = (window.innerWidth - listW) - 80;  
    }
    setScrollX(x);
  }

  return (
    <div className="movieRow">
        <h2>{title}</h2>

        <div className="movieRow--left" onClick={handleLeftArrow}>
          <NavigateBeforeIcon style={{fontSize: 50}}/>
        </div>

        <div className="movieRow--right" onClick={handleRightArrow}>
          <NavigateNextIcon style={{fontSize: 50}}/>
        </div>

        <div className="movieRow--listarea">

          <div 
            className="movieRow--list"
            style={{
              marginLeft: scrollX,
              width: items.length * 200
            }}
          >
            {
              items.map((item, key) => (
                    <div key={key} className="movieRow--item">
                      <Link to={`/details/${type}/${item.id}`}>
                        <img alt={item.original_title} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                      </Link>
                    </div>
              ))
            }
          </div>
      {/* } */}
        </div>
    </div>
  );
}

export default MovieRow;
