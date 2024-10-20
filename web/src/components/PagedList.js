import UpDown from "./UpDown";
import ToolPanel from "./ToolPanel";
import ListView from "./ListView";
import React, { useState, useEffect } from 'react';
import ToolButton from "./ToolButton";

export default function PagedList({
        children,
        pageMin = 1,
        pageMax = 1,
        pageValue = 1,
        inSelectMode,
        onPageValueChange,
        onSelectModeChange 
    }) {
    const [listViewInSelectMode, setListViewInSelectMode] = useState(inSelectMode);

    const handleCancelButtonClick = (event) => {
        const newValue = false;
        setListViewInSelectMode(newValue);
        if (onSelectModeChange) {
            onSelectModeChange({value: newValue});
        }
    }

    useEffect(() => {
        setListViewInSelectMode(inSelectMode);
    }, [inSelectMode]);

    return (
        <div className="paged-list">
            <ToolPanel>
                {listViewInSelectMode && (
                    <ToolButton text="Отмена" icon="icon-cross" onClick={handleCancelButtonClick} />
                )}
                <UpDown min={pageMin} max={pageMax} value={pageValue} onChange={onPageValueChange} />
            </ToolPanel>
            <div className="paged-list__content">
                <ListView desktopColumns="2" mobileColumns="1" inSelectMode={listViewInSelectMode}>
                    {children}
                </ListView>
            </div>
        </div>
    )
}
