import React, { createContext, useContext, useState } from 'react';

let notificationId = 1;

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
};

export function AppContextProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [modalCaption, setModalCaption] = useState("");
    const [modalChildren, setModalChildren] = useState(<div></div>);
    const [modalShow, setModalShow] = useState(false);

    const showNotification = (caption, text, level, buttons) => {
        const key = "notification-" + notificationId;
        notificationId++;

        setNotifications((prev) => {
            const newNotification = { key, caption, text, level, buttons };
            const updatedNotifications = [...prev, newNotification];

            if (updatedNotifications.length > 3) {
                updatedNotifications.shift(); // Удаляем самое старое уведомление
            }

            return updatedNotifications;
        });

        setTimeout(() => {
            removeNotification(key); // Удаляем это уведомление через 10 секунд
        }, 10000);
    };

    const removeNotification = (key) => {
        setNotifications((prev) => prev.filter((notification) => notification.key !== key ));
    };

    const showModal = (captionText, children) => {
        setModalCaption(captionText);
        setModalChildren(children);
        setModalShow(true);
    }

    const hideModal = () => {
        setModalShow(false);
    }

    const contextValue = {
        notifications,
        showNotification,
        removeNotification,
        modalCaption,
        modalChildren,
        modalShow,
        showModal,
        hideModal
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
