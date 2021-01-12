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
In **Nominations.js**
```js
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
```
### Banner 
```js

```
### Save Data to Local Storage 
```js

```
### UI/UX 
The UI/UX was inspired by [Shopify](https://www.shopify.com/)'s main page. 
