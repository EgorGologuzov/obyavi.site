import React, { createContext, useContext, useState } from 'react';
import NotificationList from '../components/NotificationList';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (caption, text, level, buttons) => {
        setNotifications((prev) => {
            const newNotification = { caption, text, level, buttons };
            const updatedNotifications = [...prev, newNotification];

            if (updatedNotifications.length > 3) {
                updatedNotifications.shift(); // Удаляем самое старое уведомление
            }

            return updatedNotifications;
        });

        setTimeout(() => {
            setNotifications((prev) => prev.filter((_, index) => index !== 0)); // Удаляем первое уведомление через 10 секунд
        }, 10000);
    };

    const removeNotification = (index) => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <NotificationList notifications={notifications} removeNotification={removeNotification} />
        </NotificationContext.Provider>
    );
};
