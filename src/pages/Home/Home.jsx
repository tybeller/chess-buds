import React from 'react';

import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Chess Buds!</h1>
            <p>Play Chess with your friends and share your games</p>
            <Link to="/play">
                <button>Play Now</button>
            </Link>
        </div>
    );
}

export default Home;
