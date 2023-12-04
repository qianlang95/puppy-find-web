import React from 'react';

const Favorites = ({ favoritesList }) => {
    return (
      <div>
        <h3>Favorites</h3>
        <ul>
          {favoritesList.map(favorite => (
            <li key={favorite.id}>{favorite.item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
export default Favorites;
  