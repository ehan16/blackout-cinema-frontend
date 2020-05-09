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
    color: 'red',
    // background: '#280547',
    // background: '#5e1212',
    background: '#111',
    textAlign: 'center',
    padding: '8px'
}

export default Banner;