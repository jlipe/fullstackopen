import React from 'react';

const SearchBox = ({ handleChange, handleFocus }) => {
    return(
        <div>
            Find Countries: 
            <input 
                onChange={handleChange} 
                onFocus={handleFocus}
            />
        </div>
    )
}

export default SearchBox;