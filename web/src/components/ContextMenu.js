import { useEffect } from "react";
import ToolButton from "./ToolButton";
import { isXYInRect, useIdRef } from "../utils/utils";

export default function ContextMenu({ children }) {
    const menuRef = useIdRef();
    const contentRef = useIdRef();

    const hideShowContent = (event) => {
        const content = contentRef.getElement();
        const menu = menuRef.getElement();

        if (content.style.display !== "none") {
            content.style.display = "none";
            return;
        }

        const isClickedToggleButton = isXYInRect(event.clientX, event.clientY, menu.getBoundingClientRect());
        if (isClickedToggleButton) {
            content.style.display = "block";
        }
    };

    useEffect(() => {
        window.addEventListener('click', hideShowContent);

        return () => {
            window.removeEventListener('click', hideShowContent);
        };
    }, []);

    return (
        <div id={menuRef.id} className="context-menu">
            <ToolButton icon="icon-three-dots"/>
            <div id={contentRef.id} className="context-menu__content">
                {children}
            </div>
        </div>
    )
}
