export function useUserService() {
    return fakeService;
}

const fakeAccounts = [
    {
        id: 1,
        role: "moder",
        phone: "+70000000001",
        theme: "light",
        lastname: "Гологузов",
        firstname: "Егор"
    },
    {
        id: 2,
        role: "moder",
        phone: "+70000000002",
        theme: "dark",
        lastname: "Ермолин",
        firstname: "Артем"
    },
    {
        id: 3,
        role: "client",
        phone: "+70000000003",
        theme: "dark",
        lastname: "Иванов",
        firstname: "Иван",
        avatar: "https://i.ytimg.com/vi/BOp5lW5ncM4/maxresdefault.jpg"
    },
    {
        id: 4,
        role: "client",
        phone: "+70000000004",
        theme: "light",
        lastname: "Сидорова",
        firstname: "Мария",
        avatar: "https://msses.ru/upload/resize_cache/iblock/a6d/450_500_2821712164bebe8964a3cb4f91f48bb72/20230830_154446.jpg"
    }
]

const fakeService = {
    signIn(login, password) {
        return new Promise((resolve, reject) => {
            const user = fakeAccounts.find((element) => element.phone === login);
            user ? resolve(user) : reject(new Error("Авторизация не удалась"));
        }) 
    },
    signOut() {
        return;
    }
}