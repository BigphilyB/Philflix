import React, { useEffect, useState, useCallback } from 'react';
import Tmdb from '../../Tmdb';
import MovieRow from '../../components/MovieRow';
import FeaturedMovie from '../../components/FeaturedMovie';
import Header from '../../components/Header';
import { useStickyState } from '../../sticky-state';

import './styles.css';
//Dit is de functie die de pagina genereerd 
function Home() {
//JSX variable worden hier gevuld met de JSON data.
  const [featuredData, setFeaturedData] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [watchList, setWatchList] = useStickyState([], 'watchList');
  const [blackHeader, setBlackHeader] = useState(false);

  //haalt uit de movie database (Tmdb) alleen films met de netflix originals kopje data
  useEffect(() => {
    const loadAll = async () => {
      //Definieerd list met getHomeList wat een functie elders is die json ophaald uit Tmdb
      const completeList = await Tmdb.getHomeList();
      setMovieList(completeList);

      //Pakt data onder de catagorie en dan mixt de films in een .random volgworden 
      const originals = completeList.filter(i => i.slug === 'originals')[0];
      const randomChosen = Math.floor(Math.random() * (originals.items.results.length - 1));
      const movieChosen = originals.items.results[randomChosen];
      const movieChosenData = await Tmdb.getMovieInfo(movieChosen.id, 'tv');
      setFeaturedData(movieChosenData);
    }

    loadAll();
  }, []);
//scroll functie
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }
    //Scroll listener
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);
//return functie 
  return (
    <div className="page">
      <Header black={blackHeader}/>

      {
        featuredData &&
        <FeaturedMovie movie={featuredData} watchList={watchList} setWatchList={setWatchList} />
      }

      <section className="lists"
      //Watchlist is alleen toonbaar als er meer dan 0 items in staan
      >
        { watchList?.length > 0 &&
        <MovieRow title="Watchlist" items={watchList} type="tv" />
        } 
        {
          movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items.results} type={item.type} addToWatchListEnabled={true} />
          ))
        }
      </section>
      

      <footer>
        <div
        //Links naar Netlflix en MovieDB
        >
          <a href="https://www.netflix.com/br/" target="_blank" rel="noopener noreferrer">
           <img alt="Netflix" width="18" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1200px-Netflix_2015_N_logo.svg.png"/>
          </a>
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img alt="Themoviedb.org" width="42" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"/>
          </a>
        </div>
      </footer>
      
      {
        //Hahahaha dit is dat laad gifje hehehehe als je iets in de pagina laad
        movieList.length <= 0 &&
        <div className="loading">
          <img alt="Carregando" src="https://i.imgflip.com/59mzsv.gif"/>
        </div>
      }      

    </div>
  );
}

export default Home;
