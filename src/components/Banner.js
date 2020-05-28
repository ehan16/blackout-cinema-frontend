import React from "react";

function Banner(props) {
    return (
        <div className="banner">
            <div style={ nameStyle }>
                <strong><h5>{ props.name }</h5></strong>
            </div>
        </div>
        );
}

const nameStyle = {
    color: 'red',
    background: '#111',
    textAlign: 'center',
    padding: '8px',
    fontWeight: 'bolder'
}

export default Banner;