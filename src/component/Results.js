import './Results.css'; 
import React from 'react';
import { BiMovie } from 'react-icons/bi'; 

function Results(props) {

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
}

export default Results 