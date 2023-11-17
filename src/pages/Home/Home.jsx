import React from 'react';

import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to the Chess Website!</h1>
            <p>Here you can find information about chess, play online, and connect with other chess enthusiasts.</p>
            <Link to="/play">
                <button>Play Now</button>
            </Link>
        </div>
    );
}

export default Home;
