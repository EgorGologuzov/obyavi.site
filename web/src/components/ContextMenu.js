import { useEffect, useRef, useState } from "react";
import ToolButton from "./ToolButton";
import { isPointInRect } from "../utils/utils";

export default function ContextMenu({ children }) {
    const menuRef = useRef(null);
    const [isContentVisible, setIsContentVisible] = useState(false); 

    const handleWindowClick = (event) => {
        setIsContentVisible(!isContentVisible && isPointInRect(event.clientX, event.clientY, menuRef.current.getBoundingClientRect()));
    }

    useEffect(() => {
        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    return (
        <div ref={menuRef} className="context-menu">
            <ToolButton icon="icon-three-dots"/>
            <div className="context-menu__content" style={{display: isContentVisible ? "block" : "none"}}>
                {children}
            </div>
        </div>
    )
}