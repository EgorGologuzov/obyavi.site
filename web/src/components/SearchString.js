import React, { useState } from 'react';

export default function SearchString({data}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    let input;
    let button;

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value) {
            const filteredResults = data.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults([]);
        }
    };

    const handleSelect = (result) => {
        setQuery(result);
        setResults([]);
    };

    if (results.length>0){
        input=<input className="search-string_search-bar_input" type="text" placeholder="Search.." value={query} onChange={handleChange} style={{borderBottomRightRadius:"0px",borderBottomLeftRadius:"0px",borderBottom:"1px solid var(--secondary)"}}/>
        button=<button className="search-string_search-bar_button" style={{borderBottomRightRadius:'0px'}}/>
    }
    else{
        input=<input className="search-string_search-bar_input" type="text" placeholder="Search.." value={query} onChange={handleChange}/>
        button=<button className="search-string_search-bar_button"/>
    }

    return (
    <div className="search-string">
        <div className='search-string_search-bar'>
           {input}
           {button}
        </div>
                

        {results.length > 0 && (
                <ul className="search-string_results">
                    {results.map((result, index) => (
                        <li key={index} onClick={() => handleSelect(result)}>
                            {result}
                        </li>
                    ))}
                </ul>
            )}
    </div>
    );
}