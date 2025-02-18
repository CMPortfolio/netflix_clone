import React from 'react';
import './App.css';
import Row from './Row';  
import requests from './requests';
import Banner from "./Banner";  // ✅ Import is correct
import Nav from "./Nav";  

function App() {
  return (
    <div className="app">
      <Nav />  {/* ✅ Navbar */}
      <Banner />  {/* ✅ Add the Banner here */}
      
      <Row title="CHRISFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      {/* <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} /> */}
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;

