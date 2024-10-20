import Button from "./Button";
import Header from "./Header";
import React, { useRef, useEffect } from 'react';
import { isPointInRect } from "../utils/utils";

export default function Modal({ children, show, buttons, onClose }) {
    const modalFormRef = useRef(null);

    const handleWindowClick = (event) => {
        if (!modalFormRef.current) {
            return;
        }

        if (!isPointInRect(event.clientX, event.clientY, modalFormRef.current.getBoundingClientRect())) {
            onClose && onClose();
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleWindowClick);
        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, [])

    return show && (
        <div className="modal">
            <div ref={modalFormRef} className="modal__form">
                <div className="modal__header">
                    <Header level="4">Заголовок модального окна</Header>
                    <img className="modal__cross icon-cross" onClick={onClose} />
                </div>
                <div className="modal__content">
                    {children}
                </div>
                <div className="modal__footer">
                    {buttons && buttons.map((button, index) => (
                        <Button
                            key={index}
                            color={button.color}
                            onClick={button.onClick}>
                            {button.text}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
