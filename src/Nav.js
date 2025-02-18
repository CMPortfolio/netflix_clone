import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll); // ✅ Properly removes event listener
        };
    }, []);

    return (
        <div className={`nav ${show ? "nav_black" : ""}`}>
            <img className='nav_logo' src='/rebg.png' alt='Netflix Logo' />
            <img className='nav_avatar' src='/366be133850498.56ba69ac36858-392795703.png' alt='Avatar' />
        </div>
    );
}

export default Nav;
