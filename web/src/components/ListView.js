import React, { useState, useRef } from 'react';
import Grid from "./Grid";

export default function ListView({ children, desktopColumns = "2", mobileColumns = "1", inSelectMode }) {
    const [selectedCards, setSelectedCards] = useState(new Set());
    const listView = useRef(null);

    const handleCardClick = (id, event) => {
        if (listView.current.classList.contains('list-view_select-mode')) {
            event.preventDefault();

            const newSelectedCards = new Set(selectedCards);
            if (newSelectedCards.has(id)) {
                newSelectedCards.delete(id);
            } else {
                newSelectedCards.add(id);
            }
            setSelectedCards(newSelectedCards);
        }
    };

    return (
        <div ref={listView} className={inSelectMode ? "list-view list-view_select-mode" : "list-view"}>
            <Grid desktopColumns={desktopColumns} mobileColumns={mobileColumns}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        const cardId = child.props.id;
                        return React.cloneElement(child, {
                            onClick: (event) => handleCardClick(cardId, event),
                            isChecked: selectedCards.has(cardId)
                        });
                    }
                    return child;
                })}
            </Grid>
        </div>
    );
}
