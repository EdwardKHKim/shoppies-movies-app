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
### Search Movies 
```js

```
### Nominate Movies 
```js

```
### Nominations 
**App.js**
```js 
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
```
**Nominations.js**
```js 
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
```
### Banner 
```js

```
### Save Data to Local Storage 
```js

```
### UI/UX 
The UI/UX was inspired by [Shopify](https://www.shopify.com/)'s main page. 
