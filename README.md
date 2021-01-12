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
```js const [nominations, setNominations] = useState([[]])``` declare a new state variable, which we'll call "nominations" and set it to an empty array. ```js useState()``` function is a Hook that lets you add React state to function components which is **./component/Nominations.js** in this web application. ```js <Nominations movies={ nominations } onClick={ removeNomination } /> ``` pass the "nominations" state variable as "movies" and the ```js removeNominations()``` function as the action to be completed ```onClick()```. 

**Nominations.js**
```js prop.movies``` and ```js props.onClick(movie)```

### Banner 
```js

```
### Save Data to Local Storage 
```js

```
### UI/UX 
The UI/UX was inspired by [Shopify](https://www.shopify.com/)'s main page. 
