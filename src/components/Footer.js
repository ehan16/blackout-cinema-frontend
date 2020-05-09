import React from "react";

class Footer extends React.Component {

    render() {
        return (
            <footer>
                <div className="d-flex text-center align-items-center justify-content-center" style={{ background: '#280547' }}>
                    <p className="m-3 w-100 text-white">© { new Date().getFullYear() } Copyright: Autocine</p>
                </div>
            </footer>
        );
    }

}

export default Footer;