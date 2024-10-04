import React from 'react';
import { FaGithub } from 'react-icons/fa';
// import './Footer.css'; // Import CSS for styling

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-3">
            <div className="container text-center">
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} My Blog App. All rights reserved.
                </p>
                <p>
                    Follow me on GitHub: 
                    <a 
                        href="https://github.com/yaksh9737" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-light ms-2"
                    >
                        <FaGithub size={20} /> yaksh9737
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
