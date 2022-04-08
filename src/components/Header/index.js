import React from 'react';
import './styles.css';

function Header( { black } ) {
  return (
    <header className={black ? 'black' : ''}>
        <div className="header--logo">
          <a href="/">
            <img alt="Netflix" src="https://i.ibb.co/0sqVJqx/c2f2f883f088022d245a594ef1b314ea.png" />
          </a>  

        </div>
        <div className="header--user">
          <a href="/">
            <img alt="User" src="https://learning.royalbcmuseum.bc.ca/wp-content/uploads/2014/07/netflix-face.jpg" />
          </a>
        </div>
    </header>
  );
}

export default Header;
