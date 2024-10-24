import React, { useState } from 'react';

const DropdownList = ({label,id,name,value='value',comment='Comment', options ,disabled=false}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <p className="dropdown_caption">Label</p>
            <div className="dropdown_header" onClick={toggleDropdown}>
                <input type="text" className='dropdown_header_option' value={selectedOption} placeholder='Placeholder'></input>
                <img className={`dropdown_header_arrow ${isOpen?'up':''}`}/>
            </div>
            <p className="dropdown_comment">Comment</p>
            {isOpen && (
                <ul className="dropdown_list">
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownList;