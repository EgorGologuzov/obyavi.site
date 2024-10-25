import React, { useState } from 'react';
import Star from './Star';

const StarsBar = ({input_mode=true,id='stars-bar_1',name='stars-bar_name',value=0}) => {
    const [rating, setRating] = useState(value);

    const handleClick = (index) => {
        setRating(index);
    };

    return (
        <div className={`stars-bar ${input_mode?'':'input-off'}`} id={id}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} onClick={()=>handleClick(star)} className={`stars-bar_star${star<=rating?'-filled':''}`}/>
            ))}
        </div>
    );
};

export default StarsBar;