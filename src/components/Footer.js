import React from "react";

class Footer extends React.Component {

    render() {
        return (
            <footer className="bg-dark">
                <div className="d-flex text-center align-items-center justify-content-center">
                    <p className="m-3 w-100 text-white">© { new Date().getFullYear() } Copyright: Autocine</p>
                </div>
            </footer>
        );
    }

}

export default Footer;