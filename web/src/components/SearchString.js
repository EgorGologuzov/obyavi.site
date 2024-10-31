import React, { useRef, useState} from 'react';

export default function SearchString({
    hints,
    inputValue,
    id,
    name,
    onSearch,
    placeholder='Placeholder',
    onChange}) {
    const [results, setResults] = useState([]);
    const [isFocused,setIsFocused]=useState(false);
    let input;
    let button;
    
    const handleChange = (oldValue,newValue) => {
        if(onChange){
            onChange(oldValue,newValue);
        }
        if (newValue) {
            const filteredResults = hints.filter(item =>
                item.toLowerCase().includes(newValue.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults([]);
        }
    };

    const handleSearch=(value)=>{
        onSearch(value);
    }

    const handleSelect = (result) => {
        onChange(inputValue,result);
        setResults([]);
    };

    if (results.length>0&&isFocused){
        input=
        <input 
            className="search-string_search-bar_input" 
            type="text" placeholder={placeholder} 
            value={inputValue} 
            onChange={(e)=>handleChange(inputValue,e.target.value)} 
            id={id} 
            name={name} 
            style={{borderBottomRightRadius:"0px",borderBottomLeftRadius:"0px",borderBottom:"1px solid var(--secondary)"}}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
        />
        button=<button className="search-string_search-bar_button" style={{borderBottomRightRadius:'0px'}} onClick={(e)=>handleSearch(e.target.value)}/>
    }
    else{
        input=
        <input 
            className="search-string_search-bar_input" 
            type="text" 
            placeholder={placeholder} 
            value={inputValue} 
            onChange={(e)=>handleChange(inputValue,e.target.value)} 
            id={id}
            name={name}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
        />
        button=<button className="search-string_search-bar_button" onClick={(e)=>handleSearch(e.target.value)}/>
    }

    return (
    <div className="search-string"> 
        <div className='search-string_search-bar'>
           {input}
           {button}
        </div>
                

        {results.length > 0 && isFocused && (
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