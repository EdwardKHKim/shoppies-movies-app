import React from 'react'; 
import { BiAward } from 'react-icons/bi'; 
import './Nominations.css'

function Nominations(props) {
    return (
        <div className="nominations">
            { props.movies && props.movies.map((movie, index) => <div key={ index }>
                <div className="nomination-item">
                    <BiAward className="award-icon" /> { movie.Title } ({ movie.Year}) <button
                    className="remove-btn"
                    onClick={ () => props.onClick(movie) }>
                        Remove
                    </button>
                </div>
            </div>)}
        </div>
    )
}

export default Nominations 