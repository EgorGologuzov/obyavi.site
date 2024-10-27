import React, { useEffect } from 'react'

export default function Presentation() {
    useEffect(() => {
        document.title = "объяви.site - Главная";
    });

    return (
        <div>PresentationPage</div>
    )
}
