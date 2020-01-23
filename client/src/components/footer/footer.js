import React from 'react';
import './css/footer.css';

function Footer() {
    return (
        <div className="row mt-3 bg-footer">
            <div className="col-6 text-center p-3 border-right">
                <p className="mb-3"><b>Brought to you by:</b></p>
                <p className="mb-1"><a href="https://www.winkinglizard.com/" rel="noopener noreferrer" target="_blank">Winking Lizard Tavern</a></p>
                <p className="mb-1 small">and</p>
                <p className="m-0"><a href="http://www.bellmusicco.com/" rel="noopener noreferrer" target="_blank">Bell Music Company</a></p>
            </div>
            <div className="col-6 text-center p-3 small border-left">
                <h5 className="mb-5"><a href="mailto:ktaylor@bellmusicco.com">Contact Us</a></h5>
                <p>&copy; 2010 Skeeball World Tour</p>
            </div>
        </div>
    );
}

export default Footer;
