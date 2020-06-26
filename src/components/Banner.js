import React from "react";

function Banner(props) {
  return (
    <div className="banner">
      <div style={nameStyle}>
        <strong>
          <h6 className="font-weight-bold my-1">{props.name}</h6>
        </strong>
      </div>
    </div>
  );
}

const nameStyle = {
  color: "red",
  background: "#111",
  textAlign: "center",
  padding: "8px",
  fontWeight: "bolder",
};

export default Banner;
