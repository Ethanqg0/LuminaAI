import React, { useState } from 'react';

export default function SearchBar( {handleInputChange} ) {
    return (
        <div>
            <input type="text" placeholder="Search for Project..." onChange={handleInputChange} className="border-2 border-gray p-1"/>
        </div>
    )
}