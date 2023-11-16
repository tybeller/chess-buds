import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <header className={isMinimized ? "minimized" : ""}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                </ul>
            </nav>
            <button onClick={toggleMinimize}>
                {isMinimized ? "Maximize" : "Minimize"}
            </button>
        </header>
    );
}

export default Header;
