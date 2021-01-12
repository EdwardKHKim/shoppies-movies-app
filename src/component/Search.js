import React from 'react'; 
import './Search.css'
import { FiSearch } from "react-icons/fi"; 

function Search(props) {

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
}

export default Search