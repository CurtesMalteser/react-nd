import React, { useState } from 'react';

function BookSearch(){
    const [searchTerm, setSearchTerm] = useState('');
    // Add results state here

    const searchHandler = () => {
        console.log(searchTerm);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={searchHandler}>Search</button>
            {/* Add books list here */}
        </div>
    );
};

export default BookSearch;