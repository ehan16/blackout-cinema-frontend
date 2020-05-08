import React from "react";

function Banner(props) {
    return (
        <div className="banner">
            <div style={ nameStyle }>
                <h6>{ props.name }</h6>
            </div>
        </div>
        );
}

const nameStyle = {
    color: 'white',
    background: '#292b2c',
    textAlign: 'center',
    padding: '5px'
}

export default Banner;