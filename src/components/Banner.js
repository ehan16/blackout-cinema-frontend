import React from "react";

function Banner(props) {
    return (
        <div className={ bannerStyle }>
        
            <p>asdasdasds</p>
            <h1>{ props.name }</h1>
            <h1>{ props.name }</h1>
            <h1>{ props.name }</h1>
            <h1>{ props.name }</h1>
            <p>adsdasdasdsd</p>
        
        </div>
        );
}

const bannerStyle = {
    height: '50vh',
    backgroundImage: `url(${this.props.background})`
}

export default Banner;