import { useState } from "react";
import Button from './Button';
import DropdownList from "./DropdownList";
import './SortingDialogClient.css';

const SortingDialogClient = () => {
    const [isAscending,setIsAscending]=useState(true);
    const dropdownSamples={'option_1':'White','option_2':'Red','option_3':'Green','option_4':'Blue','option_5':'Black'};

    return ( 
        <div className='sort-dialog'>
                <DropdownList options={dropdownSamples} comment='' label=''/>
                <img 
                    className='sort-btn'
                    onClick={()=>setIsAscending(!isAscending)} 
                    style={{content:`${isAscending?'var(--icon-sort-asc)':'var(--icon-sort-desc)'}`}}
                />
                <Button onClick={()=>alert('apply')}>Применить</Button>
        </div>
     );
}

export default SortingDialogClient;