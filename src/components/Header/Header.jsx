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
                        <Link to="/play">Play</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Past Games</Link>
                    </li>
                </ul>
            </nav>
            <button onClick={toggleMinimize}>
                {isMinimized ? ">" : "<"}
            </button>
        </header>
    );
}

export default Header;
