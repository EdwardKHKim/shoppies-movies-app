# Shoppies 

The repository is a web application that allows users to search and nominate up to five movies. The web application was built using ReactJS and the movie data was acquired from OMDb API. The link to the web application is [here](https://shoppies-movies-app.netlify.app/). 

## Preview deploy 
![Demo](demo-full.gif)

## Installation instructions 
- In your terminal ```cd Directory``` 
  - Replace directory with a directory of your choice and hit enter
- ```git clone https://github.com/EdwardKHKim/shoppies-movies-app.git``` and hit enter to clone this repository
- ```cd shoppies-movies-app``` and hit enter to cd into the directory
- Type ```npm install``` and hit enter to install all dependencies 
- Type ```npm start``` and hit enter to run app locally

## Code review 
### Search
**App.js**
```js
...
// Declare a new state variable, which we'll call "value" and set it to an empty string
// useState() function is a Hook that lets you add React state to function components
const [value, setValue] = useState(""); 
...
// Set the "results" with the related value 
useEffect(() => { getRequest(value) }, [value])
...
return (
  // Pass "value" state variable as "value" and setValue() as the setValue() action in the Search component
  <Search value={ value } setValue={ setValue }/>
) 
...
```
**Search.js**
```js
...
// Prevent refresh of the web application when hit enter
const handleSubmit = (e) => {
  e.preventDefault()
}

// The value is updated with the "value" passed in App.js
const handleChange = (e) => {
  props.setValue(e.target.value);
}

return (
  <form className="search" 
    onSubmit={ handleSubmit }
  >
    <h5 className="search-header">
      Movie title
    </h5>
    <div className="search-field">
      <FiSearch className="search-icon" />
        <input 
          value={ props.value }
          onChange={ handleChange }
          placeholder="Search movies"
        ></input>
    </div>
  </form> 
); 
...
```
### Results 
**App.js**
```js
...
// Declare a new state variable, which we'll call "results" and set it to an empty array 
// useState() function is a Hook that lets you add React state to function components
const [results, setResults] = useState([]);
...
// Send Search.js response to "results" state variable
const getRequest = async (value) => {
  const url = `https://www.omdbapi.com/?s=${value}&type=movie&apikey=cb9853db`
  const response = await fetch(url)
  const responseJson = await response.json()
  
  if (responseJson.Search) {
    setResults(responseJson.Search) 
  }
}
...
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
...
return(
  ...
  // Pass "results" state variable as "movies" and removeNominations() as the onClick() action in the Results component
  <Results movies={ results } onClick={ nominateMovie } />
  ...
) 
```
**Results.js** 
```js
...
return (
  <div className="results">
    { props.movies.map((movie, index) => <div key={ index }>
      <div className="result-item" >
        <BiMovie className="movie-icon" /> { movie.Title } ({ movie.Year}) <button
          className="nominate-btn"
          onClick={ () => props.onClick(movie) }
          disabled={ movie.disabled }>
          { movie.buttonText || "Nominate" }
         </button>
       </div>
    </div>)}
  </div>
)
...
```
### Nominations 
**App.js**
```js 
...
// Declare a new state variable, which we'll call "nominations" and set it to an empty array 
// useState() function is a Hook that lets you add React state to function components
const [nominations, setNominations] = useState([[]])
...
// Removes the movie item from the "nominations" state variable
const removeNomination = (movie) => {
  for (let i = 0; i < nominations.length; i++) {
    if (nominations[i] === movie) {
      // Change button in Results to normal 
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
...
return(
  ...
  // Pass "nominations" state variable as "movies" and removeNominations() as the onClick() action in the Nominations component
  <Nominations movies={ nominations } onClick={ removeNomination } /> 
  ...
) 
...
```
**Nominations.js**
```js 
...
return (
  <div className="nominations">
    // Maps the movies which we passed in App.js as "nominations" state variable. 
    { props.movies && props.movies.map((movie, index) => <div key={ index }>
      <div className="nomination-item">
        <BiAward className="award-icon" /> { movie.Title } ({ movie.Year}) <button
          className="remove-btn"
          // Perform removeNomination() for movie
          onClick={ () => props.onClick(movie) }>
            Remove
          </button>
       </div>
    </div>)}
  </div>
)
...
```
### Banner 
**App.js** 
```js
...
// Declare a new state variable, which we'll call "isMaxNominations" and set it to false
// setIsMaxNominations(true) is declared when there are 5 movie items in the "nominations" state variable. 
const [isMaxNominations, setIsMaxNominations] = useState(false); 
...
return(
  // Pass boolean value and length of an array to determine if a banner should be shown
  <Banner isMaxNominations = { isMaxNominations } nominations={ nominations.length } />
)
...
```
### Save Data to Local Storage 
**App.js** 
```js
...
// useEffect() perform side effects in function components:
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
...
// Save the list of movie items in the "nominations" state variable to local storage
const saveNominationsToLocalStorage = ( nominations ) => {
  localStorage.setItem('nominations', JSON.stringify(nominations))
}
...
```
### UI/UX 
The UI/UX was inspired by [Shopify](https://www.shopify.com/)'s main page. 
