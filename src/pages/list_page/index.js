import React, { useEffect, useState } from 'react';
import Tmdb from '../../Tmdb';
import MovieRow from '../../components/MovieRow';
import FeaturedMovie from '../../components/FeaturedMovie';
import Header from '../../components/Header';

import './styles.css';
//Dit is de functie die de pagina genereerd 
function Home() {
//JSX variable worden hier gevuld met de JSON data.
  const [featuredData, setFeaturedData] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [blackHeader, setBlackHeader] = useState(false);



  //
  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let movieChosen = originals[0].items.results[randomChosen];
      
      let movieChosenData = await Tmdb.getMovieInfo(movieChosen.id, 'tv');
      setFeaturedData(movieChosenData);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return (
    <div className="page">
      
      <Header black={blackHeader}/>

      {
        featuredData &&
        <FeaturedMovie item={featuredData}/>
      }
      

      <section className="lists">
        {
          movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} type={item.type} />
          ))
        }
      </section>

      <footer>
        <div>
          <a href="https://www.netflix.com/br/" target="_blank" rel="noopener noreferrer">
           <img alt="Netflix" width="18" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1200px-Netflix_2015_N_logo.svg.png"/>
          </a>
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img alt="Themoviedb.org" width="42" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"/>
          </a>
        </div>
      </footer>
      
      {
        movieList.length <= 0 &&
        <div className="loading">
          <img alt="Carregando" src="https://i.imgflip.com/59mzsv.gif"/>
        </div>
      }      

    </div>
  );
}

export default Home;
