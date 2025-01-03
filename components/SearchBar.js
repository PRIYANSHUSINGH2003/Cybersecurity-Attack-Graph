// components/SearchBar.js
import { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        // Trigger search/filter on the graph (implement this functionality in Graph component)
    };

    return (
        <div>
            <input
                type="text"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="Search agents, tools, etc."
                value={query}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
