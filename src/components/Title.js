import React from 'react';
import userPicture from '../images/user-picture3.png';

const Title = () => {
  return (
    <header className="title">
      <div className="new-title"> 
        <h1 className="heading">Northcoders News</h1>
        <div className="user">jessjelly</div>
        <img className="user-picture" src={userPicture} alt="user profile" />
      </div>
    </header>
  );
};

export default Title;