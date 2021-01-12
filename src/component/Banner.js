import React from 'react'; 
import './Banner.css'

function Banner(props) {

    let { isMaxNominations } = props
    let { nominations } = props

    return (
        isMaxNominations || nominations === 5 ? 
        <div className="banner">
            <div className="banner-content">
                <span className="hand-emoji"> 👋 </span> You are done! You nominated 5 movies. 
            </div>
        </div> : null
    )
}

export default Banner 
