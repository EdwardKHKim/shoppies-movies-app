import React, { useState, useEffect, useLayoutEffect } from 'react'; 
import './App.css';
import Search from './component/Search.js'; 
import Results from './component/Results.js';
import Nominations from './component/Nominations.js'; 
import Banner from './component/Banner.js'; 

function App() {

  // Declare a new state variable
  const [results, setResults] = useState([]); 
  const [value, setValue] = useState(""); 
  const [nominations, setNominations] = useState([[]]); 
  const [isMaxNominations, setIsMaxNominations] = useState(false); 

  // Get data from OMDb API and set the results with value 
  const getRequest = async (value) => {
    const url = `https://www.omdbapi.com/?s=${value}&type=movie&apikey=cb9853db`

    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search) {
      setResults(responseJson.Search) 
    }
  }

  // Set the "results" with the related value 
  useEffect(() => { getRequest(value) }, [value])
  
  // 
  useEffect(() => {
    // Declare a variable, which we'll call "movieNominations" that contains all movie items stored in local storage
		const movieNominations = JSON.parse(
			localStorage.getItem('nominations')
    )
      if (movieNominations !== null) {
        setNominations(movieNominations);
      } else {
        setNominations([])
      }
  }, [])
  
  // Nominate the movie item from the "results" state variable
  const nominateMovie = (movie) => {
    if ((nominations === null) || (nominations !== null && nominations.length < 5)) {

      for (let i = 0; i < nominations.length; i++) {
        if (nominations[i].imdbID === movie.imdbID) {
          nominations[i].disabled = true 
          return 
        }
      }
      console.log(nominations)

      // The new list of "nominations" contain the nominated movie item 
      const nominationsList = [...nominations, movie]
      for (let i = 0; i < nominationsList.length; i++) {

        // Nominate button in Results.js change behaviour once nominated
        if (nominationsList[i] === movie) {
          nominationsList[i].disabled = true
          nominationsList[i].buttonText = "Nominated"
        }
      }

      setNominations(nominationsList)
      saveNominationsToLocalStorage(nominationsList)
    } 
    
    // Banner appears if the most recenlt nominated movie item is the fifth item
    if (nominations !== null && nominations.length === 4) {
      setIsMaxNominations(true)
    } 
  }

  // Removes the movie item from the "nominations" state variable
  const removeNomination = (movie) => {
    for (let i = 0; i < nominations.length; i++) {
      if (nominations[i] === movie) {
        nominations[i].disabled = false 
        nominations[i].buttonText = "Nominate"
      }
    }

    // Filter() declares a new list with the unwanted movie-item removed
    const nominationsList = nominations.filter(
      (nomination) => nomination.imdbID !== movie.imdbID
    )

    // If a movie item in Nominations is removed it setIsMaxNominations is always === false 
    setIsMaxNominations(false)

    // "nominations" state varaible === nominationsList. 
    setNominations(nominationsList)

    // Save the new nominationsList to local
    saveNominationsToLocalStorage(nominationsList)
    
  }

  // Save the list of movie items in the "nominations" state variable to local storage
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
