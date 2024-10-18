import UpDown from "./UpDown";
import ToolPanel from "./ToolPanel";
import ListView from "./ListView";
import React, { useState, useRef } from 'react';

export default function PagedList({ children }) {
    const [inSelectMode, setInSelectMode] = useState(false);

    const handleModeChanged = () => {
        setInSelectMode(!inSelectMode);
    }

    return (
        <div className="paged-list">
            <ToolPanel>
                <input type="checkbox" onChange={handleModeChanged} value={inSelectMode}/>
                <span>Режим выбора</span>
                <UpDown min="1" max="10" value="2" onChange={(newValue) => console.log(newValue)} />
            </ToolPanel>
            <div className="paged-list__content">
                <ListView desktopColumns="2" mobileColumns="1" inSelectMode={inSelectMode}>
                    {children}
                </ListView>
            </div>
        </div>
    )
}
