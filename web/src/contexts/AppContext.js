import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserService } from '../data/UserService';

let notificationId = 1;

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
};

const readUserFromLocalStorage = () => {
    const user = localStorage.getItem("loginedUser");
    return user ? JSON.parse(user) : null;
}

const writeUserToLocalStorage = (user) => {
    localStorage.setItem("loginedUser", JSON.stringify(user));
}

const setThemeSwitch = (value) => {
    document.getElementById("themeSwitch").checked = value;
}

export function AppContextProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [modalCaption, setModalCaption] = useState("");
    const [modalChildren, setModalChildren] = useState(<div></div>);
    const [modalShow, setModalShow] = useState(false);
    const [loginedUser, setLoginedUser] = useState(() => readUserFromLocalStorage());
    const [theme, setTheme] = useState(() => readUserFromLocalStorage()?.theme ?? "light");

    const userService = useUserService();

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

    const signIn = (login, password) => {
        return userService.signIn(login, password)
            .then((user) => {
                setLoginedUser(user);
                writeUserToLocalStorage(user);
                user.theme && setTheme(user.theme);
            });
    }

    const signOut = () => {
        setLoginedUser(undefined);
        localStorage.removeItem("loginedUser");
    }

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setThemeSwitch(newTheme === "dark");
        loginedUser.theme = newTheme;
        writeUserToLocalStorage(loginedUser);
    }

    useEffect(() => {
        setThemeSwitch(theme === "dark");
    }, [theme]);

    const contextValue = {
        notifications,
        showNotification,
        removeNotification,
        modalCaption,
        modalChildren,
        modalShow,
        showModal,
        hideModal,
        loginedUser,
        signIn,
        signOut,
        theme,
        changeTheme
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
