import React from 'react';
import './styles/navbar.scss';

const Navbar = () => {
    return (
        <div className="nav">
            <div className="nav-left">
                <h4>Logo</h4>
            </div>
            <div className="nav-right">
                <h4>Library</h4>
                <h4>Previous</h4>
                <h4>Next</h4>
                <h4>Logout</h4>
            </div>
        </div>
    );
};

export default Navbar;
