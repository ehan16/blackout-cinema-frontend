import React from "react";

class Footer extends React.Component {

    render() {
        return (
            <footer className="ft">
                <div className="d-block text-center justify-content-center" style={{ background: '#111' }}>
                    <p className="pt-3 w-100">Blackout Cinema © { new Date().getFullYear() }</p>
                    <i className="fa fa-twitter px-3" aria-hidden="true"></i>
                    <i className="fa fa-instagram px-3" aria-hidden="true"></i>
                    <i className="fa fa-facebook-square px-3" aria-hidden="true"></i>

                </div>
            </footer>
        );
    }

}

export default Footer;