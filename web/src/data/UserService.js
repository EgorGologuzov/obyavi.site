import { cleanPhone } from "../utils/utils";

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
        lastname: "Трамп",
        firstname: "Дональд",
        avatar: "https://alpinabook.ru/upload/resize_cache/iblock/8d9/550_800_1/8d9cd63476f15e85f0d8796555ab1e6b.jpg"
    },
    {
        id: 4,
        role: "client",
        phone: "+70000000004",
        theme: "light",
        lastname: "Харрис",
        firstname: "Камала",
        avatar: "https://iv.kommersant.ru/Issues.photo/DAILY/2024/158/KMO_162543_54330_1_t222_180737.jpg"
    }
]

const fakeService = {
    signIn(login, password) {
        login = cleanPhone(login);
        
        return new Promise((resolve, reject) => {
            const user = fakeAccounts.find((element) => element.phone === login);
            setTimeout(() => {
                user ? resolve(user) : reject(new Error("Неверный логин или пароль"));
            }, 500);
        }) 
    },
    signOut() {
        return;
    }
}