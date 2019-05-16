import React from 'react';
import logo from './img/logo.png'

const Header = () => {
    return (

        <div className="py-5 text-center">
            <img className="d-block mx-auto mb-3" src={logo} alt="logo" width="72" height="72" />
            <h2>Message encryption</h2>
        </div>
    )
}

export default Header