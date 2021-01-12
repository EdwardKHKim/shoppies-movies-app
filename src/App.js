import React, { useState, useEffect, useLayoutEffect } from 'react'; 
import './App.css';
import Search from './component/Search.js'; 
import Results from './component/Results.js';
import Nominations from './component/Nominations.js'; 
import Banner from './component/Banner.js'; 

function App() {

  const [results, setResults] = useState([]); 
  const [value, setValue] = useState(""); 
  const [nominations, setNominations] = useState([[]]); 
  const [isMaxNominations, setIsMaxNominations] = useState(false); 

  const getRequest = async (value) => {
    const url = `https://www.omdbapi.com/?s=${value}&type=movie&apikey=cb9853db`

    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search) {
      setResults(responseJson.Search) 
    }
  }

  useEffect(() => { getRequest(value) }, [value])
  
  useEffect(() => {
		const movieNominations = JSON.parse(
			localStorage.getItem('nominations')
    )
      if (movieNominations !== null) {
        setNominations(movieNominations);
      } else {
        setNominations([])
      }

  }, [])
  
  const nominateMovie = (movie) => {
    if ((nominations === null) || (nominations !== null && nominations.length < 5)) {

      for (let i = 0; i < nominations.length; i++) {
        if (nominations[i].imdbID === movie.imdbID) {
          nominations[i].disabled = true 
          return 
        }
      }

      console.log(nominations)

      const nominationsList = [...nominations, movie]
      for (let i = 0; i < nominationsList.length; i++) {
        if (nominationsList[i] === movie) {
          nominationsList[i].disabled = true
          nominationsList[i].buttonText = "Nominated"
        }
      }
      setNominations(nominationsList)
      saveNominationsToLocalStorage(nominationsList)
    } 
    
    if (nominations !== null && nominations.length === 4) {
      setIsMaxNominations(true)
    } 
  }

  const removeNomination = (movie) => {

    for (let i = 0; i < nominations.length; i++) {
      if (nominations[i] === movie) {
        nominations[i].disabled = false 
        nominations[i].buttonText = "Nominate"
      }
    }

    const nominationsList = nominations.filter(
      (nomination) => nomination.imdbID !== movie.imdbID
    )
    setIsMaxNominations(false)

    setNominations(nominationsList)

    saveNominationsToLocalStorage(nominationsList)
    
  }

  const saveNominationsToLocalStorage = ( nominations ) => {
    localStorage.setItem('nominations', JSON.stringify(nominations))
  }

  return (
    <div className="App">
      <Banner isMaxNominations = { isMaxNominations } nominations={ nominations.length } />
      <div className="App-header">
        shoppies 
        <div className="App-description">
          Search and nominate your favourite movies 
        </div>
      </div>
      <div className="App-body">
        <div className="App-search-field">
          <Search value={ value } setValue={ setValue }/>
        </div>
        <div className="App-content">
          <div className="App-search-results">
            <h5 className="search-results-header">
              Results for "{ value }"
            </h5>
            <Results movies={ results } onClick={ nominateMovie } />
          </div> 
          <div className="App-nominated">
            <h5 className="nominated-header">
              Nominations
            </h5>
            <Nominations movies={ nominations } onClick={ removeNomination } />
          </div>
        </div>
      </div>
      <div className="App-footer">
            © Edward Kim, inspired by Shopify UI/UX
      </div>
    </div>
  );
}

export default App;
