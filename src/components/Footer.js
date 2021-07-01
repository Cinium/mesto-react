import React from 'react';
import '../index.css'

function Footer () {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; {year} Mesto Russia</p>
        </footer>
    )
}

export default Footer