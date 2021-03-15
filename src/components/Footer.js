import React from 'react';


const Footer = props => {

    let footerStyle = ''

    if (props.correct) {
        footerStyle = 'mb-1 marginFooter2'
    } else {
        footerStyle = 'mb-1 marginFooter'
    }

    return (
        <footer className='mt-5 pt-3 text-muted text-center text-small'>
            <p className={footerStyle} >©2019 The BestCode Corp.</p>
            <nav id="footer-navigation">
            <ul className="list-inline">
                <li className="list-inline-item"><a href="#">Privacy</a></li>
                <li className="list-inline-item"><a href="#">Terms</a></li>
                <li className="list-inline-item"><a href="#">Support</a></li>
            </ul>
            </nav>
        </footer>

    )
}

export default Footer